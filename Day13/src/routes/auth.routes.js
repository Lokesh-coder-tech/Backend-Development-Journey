const express = require('express')
require('dotenv').config();
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const authRouter = express.Router()
const crypto = require('crypto')

authRouter.post("/register", async (req, res) => {
    const {email, name, password} = req.body

    const isUserAlreadyExists = await userModel.findOne({email})

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "user already esists with this email"
        })
    }

    const hash = crypto.createHash('md5').update(password).digest('hex')

    const user = await userModel.create({
        email, password: hash, name
    })

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )
    res.cookie("token", token)

    res.status(201).json({
        message: "user register",
        user,
        token
    })
})

authRouter.post("/protected", (req, res) => {
    console.log(req.cookies);
    
    res.status(200).json({
        message: "you are in protected route"
    })
})

authRouter.post("/login", async(req, res) => {
    const {email, password} =  req.body

   const user =  await userModel.findOne({email})

   if(!user){
    return res.status(404).json({
      message: "user not found with this email name"
    })
   }

   const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")

   if(!isPasswordMatched){
    return res.status(404).json({
        message: "Invalid password"
    })
   }

   const token = jwt.sign({
    id: user._id,
   }, process.env.JWT_SECRET)

   res.cookie("token", token)

   res.status(200).json({
    message: "user logged in",
    user
   })
})

module.exports = authRouter