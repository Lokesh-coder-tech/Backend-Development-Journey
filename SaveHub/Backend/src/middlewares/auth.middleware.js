import jwt from "jsonwebtoken";
import "dotenv/config";

function authUser(req, res, next) {
    // 1. Check Cookies OR Check Authorization Header
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
            success: false,
            err: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 2. Ensure we attach the ID correctly
        // If your JWT payload is { id: "123..." }, use decoded.id
        req.user = decoded.id || decoded; 

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized",
            success: false,
            err: "Invalid token"
        });
    }
}

export default authUser;