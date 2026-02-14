const postModel = require('../models/post.models')
const ImageKit = require("@imagekit/nodejs/index.js")
require("dotenv").config()
const jwt = require('jsonwebtoken')
const { toFile } = require("@imagekit/nodejs/index.js")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

async function createPostController(req, res) {
    console.log(req.body, req.file);

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
         message: "Token not provided Unauthorized access" })
    }

    let decoded = null 
    
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "user not authorized"
        })
    }

    console.log(decoded);
    
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "cohort-2-insta-clone-posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

   res.status(201).json({
    message: "Post created successfully",
    post 
   })
}

async function getPostController(req, res){
    const token = req.cookies.token

    let decoded;
    
    try {
       decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
       return res.status(401).json({
         message: "Token invalid"
       })
    }

    const userId = decoded.id

    const posts = await postModel.find({
        user : userId
    })

    res.status(200).json({
        message: "Posts fetched successfully,",
        posts
    })

}

async function getPostDetails(req, res) {

    const token = req.cookies.token

    if(!token) {
        return res.status(401).json({
            message: "UnAuthorized Access"
        })
    }

    let decoded

    try {
       decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
       return res.status(401).json({
         message: "Invalid token"
       })
    }
    const userId = decoded.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
     return res.status(404).json({
        message: "Post not found."
     })
    }
    const isValidUser = post.user.toString() === userId

    if(!isValidUser){
        return res.status(403).json({
            message: 'Forbidden content.'
        })
    }
    res.status(200).json({
     message: "Posts fetched successfully,",
     post
    })
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetails
}