import {Router} from "express"
import {register, login, getMe, verifyEmail, forgotPassword, resetPasswordConfirmation} from "../controllers/auth.controller.js"
import {registerValidator, loginValidator} from "../validators/auth.validator.js"
import authUser from "../middlewares/auth.middleware.js"

const authRouter = Router()

authRouter.post("/register", registerValidator, register)
authRouter.post("/login", loginValidator, login)
authRouter.get("/getMe", authUser, getMe)
authRouter.get("/verify-email", verifyEmail)
authRouter.post("/forgotPassword", forgotPassword)
authRouter.post("/reset-password/:token", resetPasswordConfirmation)

export default authRouter