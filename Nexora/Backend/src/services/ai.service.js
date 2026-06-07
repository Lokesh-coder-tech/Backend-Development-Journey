import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import "dotenv/config";
import { searchInternet } from "./internet.service.js";

// 1. USE THE STABLE PIXTRAL VISION MODEL
const model = new ChatMistralAI({
  model: "pixtral-12b-2409",
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function generateResponse(messages) {
  console.log("Formatting messages for Pixtral...");

  const latestMessage = messages[messages.length - 1]?.content || "";

  const webResults = await searchInternet({
    query: latestMessage,
  });

  const formattedMessages = [
    new SystemMessage(`
You are a helpful AI assistant.

Use the provided web search results whenever available.

If web search results exist:
- Prefer them over your own knowledge.
- Do not invent facts.
- Cite sources when possible.

IMPORTANT IMAGE SAFETY RULES:
- Do NOT identify real people in images.
- Do NOT guess names, identities, or relationships.
- Do NOT claim that a person is a specific public figure, celebrity, athlete, politician, or private individual.
- If asked who a person is, explain that you cannot identify people from images.
- Instead, describe visible attributes such as clothing, appearance, actions, objects, and surroundings.

Web Search Results:
${webResults}
`),
    ...messages.map((msg) => {
      if (msg.role == "user") {
        // 2. STRICT MULTIMODAL FORMATTING
        if (msg.images && msg.images.length > 0) {
          const contentArray = [
            { type: "text", text: msg.content || "Look at this image." },
          ];


          msg.images.forEach((base64String) => {
            
             console.log(
    "IMAGE PREFIX:",
    base64String.substring(0, 50)
  );
            contentArray.push({
              type: "image_url",
              // LangChain REQUIRES this exact nested object format for images
              image_url: { url: base64String },
              
            });
          });
           console.log(
    "PIXTRAL CONTENT:",
    JSON.stringify(contentArray, null, 2)
  );

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
