import mongoose from 'mongoose'
import 'dotenv/config'

async function connectDB() {
   await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database is connected")
    })
}
export default connectDB