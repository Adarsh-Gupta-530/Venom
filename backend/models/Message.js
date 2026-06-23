// backend/models/Message.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
    senderType: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    modelUsed: { type: String, default: 'gemini' },
    tokenUsage: {
      inputTokens: { type: Number },
      outputTokens: { type: Number },
    },
    responseTimeMs: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', MessageSchema);
