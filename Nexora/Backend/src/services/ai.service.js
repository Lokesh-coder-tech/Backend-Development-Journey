import {ChatMistralAI} from "@langchain/mistralai"
import "dotenv/config"

const model = new ChatMistralAI({
   model: "mistral-small-latest",
   apikey: process.env.MISTRAL_API_KEY
})