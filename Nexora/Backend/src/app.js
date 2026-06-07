import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://nexora-pgoi.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter)


// Static file serving
app.use(express.static('public'));

// SPA fallback middleware - MUST be last to catch all unmatched routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});


export default app;
