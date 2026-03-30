import express from 'express'
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import itemRouter from "./routes/item.routes.js"
import cors from "cors"
import morgan from 'morgan'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: [ "GET", "POST" ],
    // origin: "*", // Allows any origin, including your extension
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(morgan('dev'))

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});


app.use("/api/auth", authRouter)
app.use("/api/item", itemRouter)

export default app