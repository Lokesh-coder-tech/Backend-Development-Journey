const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: [true, "user already exists"]
    },
    password: String,
})

const userModel = mongoose.model('register', userSchema)

module.exports = userModel;