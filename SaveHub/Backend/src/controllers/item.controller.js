import itemModel from '../models/item.model.js';
import { addItemToQueue } from '../queues/item.queue.js';

export const saveItem = async (req, res) => {
  try {
    const { url, title } = req.body;

    // 1. Create the item with 'pending' status immediately
    // Notice: We DON'T call scrapeUrl here anymore.
    const newItem = await itemModel.create({
      userId: req.user, 
      url,
      title: title || "New Link", // Use title from extension if available
      status: 'pending'
    });
    
    // 2. Add to BullMQ - The Worker will handle the scraping
    await addItemToQueue({ itemId: newItem._id, url });

    res.status(201).json({
      success: true,
      message: "Link captured! AI is processing in the background...",
      item: newItem
    });
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};