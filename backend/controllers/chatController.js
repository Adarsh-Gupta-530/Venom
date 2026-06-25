// backend/controllers/chatController.js
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const ProviderFactory = require('../src/providers/ProviderFactory');
const mongoose = require('mongoose');

/**
 * GET /api/chats
 */
exports.getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
};

/**
 * POST /api/chat/new
 */
exports.createChat = async (req, res) => {
  try {
    const chat = new Chat({ title: 'New Chat', userId: req.user.id });
    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create chat' });
  }
};

/**
 * GET /api/chat/:id/messages
 */
exports.getChatMessages = async (req, res) => {
  try {
    const chatId = req.params.id;
    const chat = await Chat.findOne({ _id: chatId, userId: req.user.id });
    if (!chat) return res.status(404).json({ error: 'Chat not found or unauthorized' });

    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

/**
 * PATCH /api/chat/:id
 */
exports.renameChat = async (req, res) => {
  try {
    const { title } = req.body;
    const chat = await Chat.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title },
      { new: true }
    );
    if (!chat) return res.status(404).json({ error: 'Chat not found or unauthorized' });
    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to rename chat' });
  }
};

/**
 * DELETE /api/chat/:id
 */
exports.deleteChat = async (req, res) => {
  try {
    const chatId = req.params.id;
    const chat = await Chat.findOne({ _id: chatId, userId: req.user.id });
    if (!chat) return res.status(404).json({ error: 'Chat not found or unauthorized' });

    await Message.deleteMany({ chatId });
    await Chat.findByIdAndDelete(chatId);
    res.json({ message: 'Chat deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete chat' });
  }
};

/**
 * POST /api/chat
 * Body: { chatId: string, message: string }
 * Handles user message, streams Gemini response via SSE.
 */
exports.handleMessage = async (req, res) => {
  const startTime = Date.now();
  const { chatId, message } = req.body;
  if (!chatId || !message) {
    return res.status(400).json({ error: 'chatId and message are required' });
  }

  try {
    // Ensure chat exists and belongs to user
    const chat = await Chat.findOne({ _id: chatId, userId: req.user.id });
    if (!chat) return res.status(404).json({ error: 'Chat not found or unauthorized' });

    // Save user message
    const userMsg = new Message({
      chatId,
      senderType: 'user',
      content: message,
    });
    await userMsg.save();

    // Retrieve full conversation history (ordered)
    const history = await Message.find({ chatId }).sort({ createdAt: 1 });
    const standardMessages = history.map(m => ({
      role: m.senderType === 'user' ? 'user' : 'assistant',
      content: m.content,
    }));

    const provider = ProviderFactory.getProvider();
    const providerName = provider.constructor.name.replace('Provider', '').toLowerCase();

    // Set up SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.flushHeaders(); // ensures headers are sent immediately

    let assistantContent = '';
    try {
      const stream = provider.streamResponse(standardMessages);
      for await (const token of stream) {
        assistantContent += token;
        // Send token as a SSE data event
        res.write(`data: ${JSON.stringify({ token })}\n\n`);
      }
    } catch (streamErr) {
      console.error('Streaming error:', streamErr);
      res.write(`event: error\ndata: ${JSON.stringify({ error: 'AI streaming failed' })}\n\n`);
    }

    // Persist assistant response only if we got content
    if (assistantContent) {
      const assistantMsg = new Message({
        chatId,
        senderType: 'assistant',
        content: assistantContent,
        modelUsed: providerName,
        responseTimeMs: Date.now() - startTime,
      });
      await assistantMsg.save();

      // Update chat metadata
      await Chat.findByIdAndUpdate(chatId, {
        $inc: { totalMessages: 2 }, // user + assistant
        updatedAt: new Date(),
      });
    }

    // Signal end of stream
    res.write('event: done\ndata: {}\n\n');
    res.end();
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message || 'Failed to process chat message' });
    } else {
      res.write(`event: error\ndata: ${JSON.stringify({ error: err.message || 'Server error' })}\n\n`);
      res.end();
    }
  }
};

