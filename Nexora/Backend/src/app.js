import express from "express";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import chatRouter from "./routes/chat.routes.js";

const app = express();

// Increase the limit to 50mb (or whatever size you feel is appropriate)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: [ "GET", "POST", "PUT", "DELETE" ],
}))


app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter)

export default app;
