import { Queue } from 'bullmq';
import { Redis } from 'ioredis';
import "dotenv/config";

// Connect to Redis
export const connection = new Redis({
   host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null });

// Create the 'item-processing' queue
const itemQueue = new Queue('item-processing', { connection });

export const addItemToQueue = async (data) => {
  await itemQueue.add('process-link', data, {
    attempts: 3, // Retry 3 times if scraping fails
    backoff: { type: 'exponential', delay: 2000 } // Wait before retrying
  });
};
