import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";
import "dotenv/config"
import bcrypt from "bcryptjs";
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function register(req, res) {

    const { username, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [ { email }, { username } ]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "User with this email or username already exists",
            success: false,
            err: "User already exists"
        })
    }

    const user = await userModel.create({ username, email, password })

    const token = jwt.sign({
        id: user._id,
        username: user.username,
    }, process.env.JWT_SECRET, { expiresIn: '7d' })

    const emailVerificationToken = jwt.sign({
        email: user.email,
    }, process.env.JWT_SECRET)

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    await sendEmail({
        to: email,
        subject: "Welcome to SaveHub!",
        html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>SaveHub</strong>. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The SaveHub Team</p>
        `
    })

    res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });

}
export async function login(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password",
            success: false,
            err: "User not found"
        })
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return res.status(400).json({
            message: "Invalid email or password",
            success: false,
            err: "Incorrect password"
        })
    }

    if (!user.verified) {
        return res.status(400).json({
            message: "Please verify your email before logging in",
            success: false,
            err: "Email not verified"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username,
    }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.status(200).json({
        message: "Login successful",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}
export async function getMe(req, res) {
    const userId = req.user.id;

    const user = await userModel.findById(userId).select("-password");

    if (!user) {
        return res.status(404).json({
            message: "User not found",
            success: false,
            err: "User not found"
        })
    }

    res.status(200).json({
        message: "User details fetched successfully",
        success: true,
        user
    })
}
export async function verifyEmail(req, res) {
    const { token } = req.query;

    try {


        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        const user = await userModel.findOne({ email: decoded.email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid token",
                success: false,
                err: "User not found"
            })
        }

        user.verified = true;

        await user.save();

        const html =
            `
        <h1>Email Verified Successfully!</h1>
        <p>Your email has been verified. You can now log in to your account.</p>
        <a href="http://localhost:3000/login">Go to Login</a>
    `

        return res.send(html);
    } catch (err) {
        return res.status(400).json({
            message: "Invalid or expired token",
            success: false,
            err: err.message
        })
    }
}

export async function forgotPassword(req, res) {
    try {
        const { email } = req.body;

        // 1. Find user by email (Use the Capital 'User' Model)
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // 2. Create a JWT for the reset token
        // We include the user ID and set a short expiration (15-60 mins)
        const resetToken = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        // 3. Optional: Still save it to DB if you want to "burn" the token after one use
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // 4. Create the full URL for your React frontend
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

        // 5. Send the email
        await sendEmail({
            to: user.email,
            subject: "SaveHub - Password Reset Request",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
                    <h2 style="color: #333;">Password Reset</h2>
                    <p>You requested to reset your password. Click the button below to set a new one:</p>
                    <a href="${resetUrl}" style="display: inline-block; background: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px;">Reset My Password</a>
                    <p style="margin-top: 20px; color: #666; font-size: 12px;">This link will expire in 1 hour.</p>
                </div>
            `,
        });

        res.status(200).json({
            message: "Reset link sent to your email",
            success: true
        });

    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
export async function resetPasswordConfirmation(req, res) {
    try {
        const { token } = req.params; // Get token from URL
        const { newPassword } = req.body; // Get new password from form

        if (!newPassword) {
            return res.status(400).json({ message: "New password is required", success: false });
        }

        // 1. Verify the JWT Token
        // This checks if the token is valid AND if it has expired automatically
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(400).json({ message: "Invalid or expired token", success: false });
        }

        // 2. Find the user from the decoded ID
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User no longer exists", success: false });
        }

        // 3. Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // 4. Update the user's password and clear the reset fields
        user.password = hashedPassword;
        user.resetPasswordToken = undefined; // Clear the token so it can't be used again
        user.resetPasswordExpires = undefined;
        
        await user.save();

        res.status(200).json({
            message: "Password has been updated successfully!",
            success: true
        });


    } catch (error) {
        console.error("Reset Confirmation Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

export const googleLogin = async (req, res) => {
    const { token } = req.body;

    try {
        // 1. Verify the Google Token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { name, email, picture } = ticket.getPayload();

        // 2. Check if user exists in your MongoDB
        let user = await userModel.findOne({ email });

        if (!user) {
            // Create a new user if they don't exist
            user = await userModel.create({
                username: name,
                email: email,
                profilePicture: picture,
                isGoogleUser: true // Mark as Google user so they don't need a password
            });
        }

        // 3. Generate your OWN App JWT (like you did for normal login)
        const appToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', appToken, { httpOnly: true }).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(400).json({ message: "Google login failed", error: error.message });
    }
};