import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js";

export async function sendMessage(req, res) {
    const { message, chat: chatId } = req.body;
    let title = null, chat = null;

    if (!chatId) {
        title = await generateChatTitle(message);
        chat = await chatModel.create({
            user: req.user.id,
            title
        });
    }

    // Determine the active chat ID
    const activeChatId = chatId || chat._id;

    // 1. Create the user message
    await messageModel.create({
        chat: activeChatId,
        content: message,
        role: "user"
    });

    // 2. Fetch ALL messages for this chat (including the one we just saved)
    const messages = await messageModel.find({ chat: activeChatId });

    // 3. Generate the response
    const result = await generateResponse(messages);

    // 4. Save the AI's response
    const aiMessage = await messageModel.create({
        chat: activeChatId,
        content: result,
        role: "ai"
    });

    res.status(201).json({
        title: title || "Existing Chat",
        chat: chat || { _id: chatId },
        aiMessage
    });
}
export async function getChats(req, res) {
    const user = req.user

    const chats = await chatModel.find({ user: user.id })

    res.status(200).json({
        message: "Chats retrieved successfully",
        chats
    })
}

export async function getMessages(req, res) {
    const { chatId } = req.params;

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    const messages = await messageModel.find({
        chat: chatId
    })

    res.status(200).json({
        message: "Messages retrieved successfully",
        messages
    })
}

export async function deleteChat(req, res) {

    const { chatId } = req.params;

    const chat = await chatModel.findOneAndDelete({
        _id: chatId,
        user: req.user.id
    })

    await messageModel.deleteMany({
        chat: chatId
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    res.status(200).json({
        message: "Chat deleted successfully"
    })
}