const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
   username:{
    type: String,
    unique: [true, "user name already exists"],
    required: [true, "user name is required"]
   },
   email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"]
   },
   password: {
    type: String,
    required: [true, "Password is required"],
    select: false 
   },
   bio: String,
   profileImage: {
    type: String,
    default:'https://ik.imagekit.io/6o8d6hevj/cohort-2-insta-clone-posts/Test_9600rJhtJ'
   }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel