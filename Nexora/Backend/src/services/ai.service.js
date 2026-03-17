import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage } from "langchain";
import "dotenv/config";

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  apikey: process.env.MISTRAL_API_KEY,
});

export async function generateResponse(messages) {
  const formattedMessages = messages
    .map((msg) => {
      if (msg.role === "user") {
        return new HumanMessage(msg.content);
      } else if (msg.role === "ai" || msg.role === "assistant") {
        return new AIMessage(msg.content);
      } else if (msg.role === "system") {
        return new SystemMessage(msg.content);
      }
      return null;
    })
    .filter((msg) => msg !== null); // Remove the nulls so the array is clean

  // 2. Safety check: if the array is empty, don't call the model
  if (formattedMessages.length === 0) {
    throw new Error("No valid messages provided to AI service.");
  }

  const response = await model.invoke(formattedMessages);
  return response.content; // Use .content (standard for LangChain) instead of .text
}
export async function generateChatTitle(message) {
  const response = await model.invoke([
    new SystemMessage(`
         You are a helpful assistant that generates concise and descriptive titles for chat conversations.
            
         User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, giving users a quick understanding of the chat's topic.    
      `),
    new HumanMessage(`
         Generate a title for a chat conversation based on the following first message:
         "${message}"
      `)
  ]);
   return response.text;
}
