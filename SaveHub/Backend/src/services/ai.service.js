import { ChatMistralAI } from "@langchain/mistralai";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import "dotenv/config";

const model = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY,
  modelName: "mistral-small-latest",
  temperature: 0, // Keeps the output consistent and factual
});

export const analyzeContent = async (content) => {
  try {
    // 1. Create a Parser to ensure we get JSON
    const parser = new JsonOutputParser();

    // 2. Create a Template for the AI
    const prompt = PromptTemplate.fromTemplate(
      "You are a knowledge assistant. Summarize the following text in 2 concise sentences and provide 5 relevant tags.\n{format_instructions}\nText: {text}"
    );

    // 3. Create the "Chain"
    const chain = prompt.pipe(model).pipe(parser);

    // 4. Run the Chain
    const result = await chain.invoke({
      text: content.substring(0, 4000),
      format_instructions: "Return the output in JSON format: { \"summary\": \"...\", \"tags\": [\"tag1\", \"tag2\", ...] }",
    });

    return result;
  } catch (error) {
    console.error("LangChain Error:", error.message);
    return { summary: "Summary failed.", tags: ["Uncategorized"] };
  }
};