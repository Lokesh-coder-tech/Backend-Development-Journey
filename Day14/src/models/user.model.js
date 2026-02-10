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
    required: [true, "Password is required"]
   },
   bio: String,
   profileImage: {
    type: String,
    default:'https://image.com'
   }
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel