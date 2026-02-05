const express = require('express')
require('dotenv').config();
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const authRouter = express.Router()

authRouter.post("/register", async (req, res) => {
    const {email, name, password} = req.body

    const isUserAlreadyExists = await userModel.findOne({email})

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "user already esists with this email"
        })
    }

    const user = await userModel.create({
        email, password, name
    })

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )

    res.status(201).json({
        message: "user register",
        user,
        token
    })
})

module.exports = authRouter