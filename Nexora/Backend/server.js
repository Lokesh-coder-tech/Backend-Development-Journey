import app from './src/app.js'
import connectDB from './src/config/database.js' 
import http from "http"
import { initSocket } from './src/sockets/server.socket.js'

connectDB()

const httpServer = http.createServer(app);

initSocket(httpServer);

httpServer.listen(3000, () => {
    console.log("server is listening on port 3000")
})