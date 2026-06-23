// backend/models/Chat.js
const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    // totalMessages is derived from Message collection; we keep a count for quick access
    totalMessages: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Auto‑generate a title from the first user message if not provided
ChatSchema.pre('save', async function (next) {
  if (!this.isNew || this.title) return next();
  const Message = mongoose.model('Message');
  const firstMsg = await Message.findOne({ chatId: this._id, senderType: 'user' })
    .sort({ createdAt: 1 })
    .lean();
  if (firstMsg && firstMsg.content) {
    const trimmed = firstMsg.content.trim();
    this.title = trimmed.length > 40 ? trimmed.slice(0, 37) + '...' : trimmed;
  } else {
    this.title = 'New Chat';
  }
  next();
});

module.exports = mongoose.model('Chat', ChatSchema);
