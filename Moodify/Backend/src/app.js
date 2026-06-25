const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require("path");

const filePath = path.join(__dirname, "public", "uploads");


const app = express()
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
// app.use(express.static("./public"))

// app.use('*name', (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "/public/index.html"))
// })

const authRoutes = require("./routes/auth.routes")
const songRoutes = require("./routes/song.routes")

app.use("/api/auth", authRoutes)
app.use("/api/songs", songRoutes)

app.use(express.static('public'));

// SPA fallback middleware - MUST be last to catch all unmatched routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});


module.exports = app;