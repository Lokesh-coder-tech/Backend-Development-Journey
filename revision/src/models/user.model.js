const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    name: String,
    email:{
        type: String,
        unique: [true, 'user already exist']
    },
    password: String
})

const userModel = mongoose.model('signup', userschema)

module.exports = userModel