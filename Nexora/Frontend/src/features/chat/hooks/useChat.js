import { initializeSocketConnection } from "../service/chat.socket";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../service/chat.api";
import {
  setChats,
  setCurrentChatId,
  setLoading,
  setError,
  createNewChat,
  addNewMessage,
  addMessages,
  setMessages,
} from "../chat.slice";
import { useDispatch } from "react-redux";

export const useChat = () => {
  const dispatch = useDispatch();

  // 1. Added `images` to the destructured arguments
  async function handleSendMessage({ message, chatId, images }) {
    dispatch(setLoading(true));
    
    // 2. Pass `images` along to your API request
    const data = await sendMessage({ message, chatId, images });
    const { chat, aiMessage } = data;

    dispatch(
      createNewChat({
        chatId: chat._id,
        title: chat.title,
      }),
    );
    
    // 3. (Optional but recommended) Include the images in the user's message state
    // so you can render them in the chat UI as part of the user's bubble later!
    dispatch(
      addNewMessage({
        chatId: chat._id,
        content: message,
        role: "user",
        images: images || [], // Store base64 strings in Redux state
      }),
    );
    
    dispatch(
      addNewMessage({
        chatId: chat._id,
        content: aiMessage.content,
        role: aiMessage.role,
      }),
    );
    
    dispatch(setCurrentChatId(chat._id));
    dispatch(setLoading(false)); // Don't forget to turn off loading!
  }

  async function handleGetChats() {
    dispatch(setLoading(true));
    const data = await getChats();
    const { chats } = data;
    dispatch(
      setChats(
        chats.reduce((acc, chat) => {
          acc[chat._id] = {
            id: chat._id,
            title: chat.title,
            messages: [],
            lastUpdated: chat.updatedAt,
          };
          return acc;
        }, {}),
      ),
    );
    dispatch(setLoading(false));
  }

  async function handleOpenChat(chatId) {
    // Clear messages first and set the current chat ID
    dispatch(setCurrentChatId(chatId));
    dispatch(setLoading(true));
    
    try {
      const data = await getMessages(chatId);
      const { messages } = data;
      const formattedMessages = messages.map((msg) => ({
        content: msg.content,
        role: msg.role,
        images: msg.images || [], // Also grab images from history if your backend sends them
      }));
      
      // Set messages AFTER fetching from backend
      dispatch(
        setMessages({
          chatId,
          messages: formattedMessages,
        }),
      );
    } catch (error) {
      console.error("Error loading messages:", error);
      dispatch(setError("Failed to load chat messages"));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    initializeSocketConnection,
    handleSendMessage,
    handleGetChats,
    handleOpenChat
  };
};