const express = require('express')
const userModel = require('../models/user.model')
const authRouter = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()

authRouter.post('/signup', async (req, res) => {
    const {name, email, password} = req.body

    const isUserExists = await userModel.findOne({email})

    if(isUserExists){
        return res.status(409).json({
            message: "user already exists with this email"
        })
    }

    const user = await userModel.create({
        name, email, password
    })

    const token = jwt.sign(
        {
          id: user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie('signUp-cookie', token)
    
    res.status(201).json({
        message: "user signed in",
        user,
        token
    })
})
authRouter.post('/login', async (req, res) => {
    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message:"user not found with this email"
        })
    }

    const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET
    )

    res.cookie("login-cookie", token)

    res.status(200).json({
        message: "user logged in",
        user,
        token
    })

})

module.exports = authRouter