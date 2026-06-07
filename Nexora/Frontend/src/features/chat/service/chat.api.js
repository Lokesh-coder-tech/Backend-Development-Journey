import axios from 'axios'

const api = axios.create({
    baseURL: "https://nexora-pgoi.onrender.com" ,
    withCredentials: true,
})

// 1. Added 'images' to the parameters
export const sendMessage = async ({ message, chatId, images }) => {
    // 2. Added 'images' to the request body
    const response = await api.post("/api/chats/message", { message, chatId, images })
    return response.data
}

export const getChats = async () => {
    const response = await api.get("/api/chats")
    return response.data
}

export const getMessages = async (chatId) => {
    const response = await api.get(`/api/chats/${chatId}/messages`)
    return response.data
}

export const deleteChat = async (chatId) => {
    const response = await api.delete(`/api/chats/delete/${chatId}`)
    return response.data
}