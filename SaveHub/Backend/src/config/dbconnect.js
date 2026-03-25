import mongoose from 'mongoose'
import "dotenv/config"

function dbconnect() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database connected")
    })
}
export default dbconnect