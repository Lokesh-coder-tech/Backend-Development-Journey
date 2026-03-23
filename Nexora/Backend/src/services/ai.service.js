import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage } from "langchain";
import "dotenv/config";

// 1. USE THE STABLE PIXTRAL VISION MODEL
const model = new ChatMistralAI({
  model: "pixtral-12b-2409", 
  apikey: process.env.MISTRAL_API_KEY,
});

export async function generateResponse(messages) {
  console.log("Formatting messages for Pixtral...");

  const formattedMessages = [
    new SystemMessage(`
        You are a highly capable AI with vision capabilities. 
        Always analyze and describe images when the user provides them.
    `),
    ...messages.map((msg) => {
      if (msg.role == "user") {
        
        // 2. STRICT MULTIMODAL FORMATTING
        if (msg.images && msg.images.length > 0) {
          const contentArray = [{ type: "text", text: msg.content || "Look at this image." }];
          
          msg.images.forEach((base64String) => {
            contentArray.push({
              type: "image_url",
              // LangChain REQUIRES this exact nested object format for images
              image_url: { url: base64String } 
            });
          });

          return new HumanMessage({ content: contentArray });
        } else {
          return new HumanMessage(msg.content);
        }
      } else if (msg.role == "ai") {
        return new AIMessage(msg.content);
      }
    }),
  ];

  try {
    // 3. CALL MODEL DIRECTLY (No Agent Wrapper to strip the images)
    const response = await model.invoke(formattedMessages);
    return response.content; 
  } catch (error) {
    console.error("Mistral API Error:", error);
    return "I ran into an error trying to process that image. Please check the backend console.";
  }
}

export async function generateChatTitle(message) {
  const response = await model.invoke([
    new SystemMessage(`
         You are a helpful assistant that generates concise and descriptive titles for chat conversations.
         Generate a title that captures the essence of the conversation in 2-4 words.    
      `),
    new HumanMessage(`
         Generate a title based on this first message: "${message}"
      `),
  ]);
  // Fixed bug: LangChain uses .content, not .text for standard model invocation
  return response.content; 
}