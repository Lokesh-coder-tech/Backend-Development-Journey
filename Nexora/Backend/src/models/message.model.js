import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: [ 'user', 'ai' ],
            required: true,
        },
        // Added the images field to store an array of Base64 strings
        images: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

const messageModel = mongoose.model('Message', messageSchema);

export default messageModel;