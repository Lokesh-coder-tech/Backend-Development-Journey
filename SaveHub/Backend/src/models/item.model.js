import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  // 1. Ownership & Source
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  url: {
    type: String,
    required: [true, "URL is required"],
    trim: true
  },
  title: {
    type: String,
    trim: true
  },

  // 2. Extracted Data (From Scraper)
  content: {
    type: String, // The full text of the article/page
    default: ""
  },
  image: {
    type: String, // The og:image or thumbnail
    default: ""
  },

  // 3. AI Enriched Data (From OpenAI)
  aiSummary: {
    type: String,
    default: ""
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String, // e.g., "Article", "Video", "Tweet", "PDF"
    default: "Uncategorized"
  },

  // 4. Organization
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection' // Optional: if you add folders later
  },

  // 5. Processing Status
  // Important for UX: Shows 'Processing...' on the frontend while AI works
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexing for faster searching
ItemSchema.index({ title: 'text', tags: 'text' });

const itemModel = mongoose.model('Item', ItemSchema);

export default itemModel;