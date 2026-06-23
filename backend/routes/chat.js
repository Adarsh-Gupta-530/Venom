// backend/routes/chat.js
const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chatController');
const auth = require('../middleware/authMiddleware');

// Get all chats for a user
router.get('/api/chats', auth, chatController.getAllChats);

// Create a new chat (title optional; will be auto‑generated)
router.post('/api/chat/new', auth, chatController.createChat);

// Get messages for a specific chat
router.get('/api/chat/:id/messages', auth, chatController.getChatMessages);

// Rename a chat
router.patch('/api/chat/:id', auth, chatController.renameChat);

// Delete a chat
router.delete('/api/chat/:id', auth, chatController.deleteChat);

// Send a user message and get streamed AI response
router.post('/api/chat', auth, chatController.handleMessage);

module.exports = router;
