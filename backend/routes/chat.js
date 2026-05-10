const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(100);
    res.json(messages.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/messages', async (req, res) => {
  try {
    const { username, avatar, message, room } = req.body;

    const newMessage = await Message.create({
      username,
      avatar,
      message,
      room: room || 'global'
    });

    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;