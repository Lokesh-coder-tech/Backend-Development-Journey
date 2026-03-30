import axios from 'axios'
import * as cheerio from 'cheerio'

/**
 * Scrapes metadata and main content from a given URL
 * @param {string} url 
 * @returns {object} { title, description, image, content }
 */
export const scrapeUrl = async (url) => {
  try {
    // 1. Fetch the HTML with a User-Agent to avoid being blocked
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
      },
      timeout: 10000, // 10 second timeout
    });

    const $ = cheerio.load(data);

    // 2. Extract Metadata (OpenGraph or Standard tags)
    const title = $('title').text() || $('meta[property="og:title"]').attr('content') || 'Untitled';
    const description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || '';
    const image = $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content') || '';

    // 3. Extract Main Content (Simple approach: Get all paragraph text)
    // We remove scripts, styles, and nav elements to get clean text
    $('script, style, nav, footer, header, noscript').remove();
    
    let content = $('p')
      .map((i, el) => $(el).text().trim())
      .get()
      .join(' ');

    // Limit content size to avoid crashing the AI later (e.g., first 8000 chars)
    const cleanedContent = content.substring(0, 8000);

    return {
      title,
      description,
      image,
      content: cleanedContent,
    };
  } catch (error) {
    console.error(`Scraping Error for ${url}:`, error.message);
    throw new Error('Failed to extract content from the provided URL');
  }
};


