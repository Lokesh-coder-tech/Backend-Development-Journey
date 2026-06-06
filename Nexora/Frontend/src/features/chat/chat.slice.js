import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {},
    currentChatId: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    createNewChat: (state, action) => {
      const { chatId, title } = action.payload;
      // Only create if it doesn't exist, preserve messages if it does
      if (!state.chats[chatId]) {
        state.chats[chatId] = {
          id: chatId,
          title,
          messages: [],
          lastUpdated: new Date().toISOString(),
        };
      }
    },
    addNewMessage: (state, action) => {
      const { chatId, content, role, images } = action.payload;
      state.chats[chatId].messages.push({
        content,
        role,
        images: images || [],
      });
    },
    addMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      state.chats[chatId].messages.push(...messages);
    },
    setMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      state.chats[chatId].messages = messages;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCurrentChat: (state, action) => {
      state.currentChatId = action.payload ? action.payload.id : null;
    },
    createChat: (state, action) => {
      const { id, title, messages } = action.payload;
      state.chats[id] = {
        id,
        title,
        messages,
        lastUpdated: new Date().toISOString(),
      };
    },
    removeChat: (state, action) => {
      delete state.chats[action.payload];

      if (state.currentChatId === action.payload) {
        state.currentChatId = null;
      }
    },
  },
});

export const {
  setChats,
  setCurrentChatId,
  setLoading,
  setError,
  createNewChat,
  addNewMessage,
  addMessages,
  setMessages,
  setCurrentChat,
  createChat,
  removeChat
} = chatSlice.actions;

export default chatSlice.reducer;
