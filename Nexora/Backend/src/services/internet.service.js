import "dotenv/config"
import {tavily as Tavily} from '@tavily/core'

const tavily = Tavily({
    apiKey: process.env.TAVILY_API_KEY,
})

export const searchInternet = async ({query}) => {
 const results = await tavily.search(query, {
    maxResults: 5,
 })

console.log(JSON.stringify(results))
const context = results.results
  .map(
    (item) => `
Title: ${item.title}

Content: ${item.content}

Source: ${item.url}
`
  )
  .join("\n\n");
 return context;
}