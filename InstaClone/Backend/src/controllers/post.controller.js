const postModel = require('../models/post.models')
const likesModel= require('../models/likes.model')
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
   
    
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "cohort-2-insta-clone-posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

   res.status(201).json({
    message: "Post created successfully",
    post 
   })
}

async function getPostController(req, res){
    


    const userId = req.user.id

    const posts = await postModel.find({
        user : userId
    })

    res.status(200).json({
        message: "Posts fetched successfully,",
        posts
    })

}

async function getPostDetails(req, res) {

    


    const userId = req.user.id
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

async function likePostController(req, res){

    const userId = req.user.id
    const postId = req.params.postId
    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
           message: "Post not found."
        })
       }
    
    const alreadyLiked = await likesModel.findOne({
        postId: postId,
        userId: userId
    })

    if(alreadyLiked){
        return res.status(400).json({
            message: "You have already liked this post."
        })
    }

    const like = await likesModel.create({
        postId: postId,
        username: req.user.username,
        userId: userId
    })

    res.status(201).json({
        message: "Post liked successfully.",
        like
    })
}

async function unlikePostController(req, res){

    const userId = req.user.id
    const postId = req.params.postId
    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
           message: "Post not found."
        })
       }
    
    const like = await likesModel.findOneAndDelete({
        postId: postId,
        userId: userId
    })

    if(!like){
        return res.status(400).json({
            message: "You have not liked this post."
        })
    }

    res.status(200).json({
        message: "Post unliked successfully.",
        like
    })
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetails,
    likePostController,
    unlikePostController
}