import { Worker } from 'bullmq';
import { scrapeUrl } from '../services/scraper.service.js';
import itemModel from '../models/item.model.js';
import { connection } from './item.queue.js';
import { analyzeContent } from '../services/ai.service.js';

export const itemWorker = new Worker('item-processing', async (job) => {
  const { itemId, url } = job.data;
  
  try {
    // 1. Mark as processing
    await itemModel.findByIdAndUpdate(itemId, { status: 'processing' });

    // 2. Run the Scraper (This is the heavy lifting)
    const scrapedData = await scrapeUrl(url);

    const aiData = await analyzeContent(scrapedData.content);

    // 3. Update the Item in MongoDB with the real data
    const updatedItem = await itemModel.findByIdAndUpdate(
      itemId, 
      {
        title: scrapedData.title || "Untitled",
        content: scrapedData.content,
        image: scrapedData.image,
        aiSummary: aiData.summary, // Saved to DB
        tags: aiData.tags,         // Saved to DB
        status: 'completed'
      },
      { new: true } // This returns the updated document
    );

    console.log(`✅ Job ${job.id} finished for: ${updatedItem.title}`);
  } catch (error) {
    console.error(`❌ Worker Error for Job ${job.id}:`, error.message);
    await itemModel.findByIdAndUpdate(itemId, { status: 'failed' });
  }
}, { connection });