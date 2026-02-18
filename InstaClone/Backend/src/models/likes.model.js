const mongoose = require('mongoose')

const likesSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "post id is required for liking a post"]
    },
    username: { 
        type: String,
        required: [true, "username is required for liking a post"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "user id is required for liking a post"]   
    }
})

const likesModel = mongoose.model("likes", likesSchema)

module.exports = likesModel