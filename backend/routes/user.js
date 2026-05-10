const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Anime = require('../models/Anime');
const { protect } = require('../middleware/auth');

router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('bookmarks')
      .populate({
        path: 'watchHistory.anime',
        select: 'title poster rating'
      });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/profile', protect, async (req, res) => {
  try {
    const { username, avatar, preferences } = req.body;

    const user = await User.findById(req.user._id);

    if (username) user.username = username;
    if (avatar) user.avatar = avatar;
    if (preferences) user.preferences = preferences;

    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      preferences: user.preferences
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/bookmark/:animeId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const animeId = req.params.animeId;

    if (user.bookmarks.includes(animeId)) {
      user.bookmarks = user.bookmarks.filter(id => id.toString() !== animeId);
    } else {
      user.bookmarks.push(animeId);
    }

    await user.save();
    res.json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/bookmarks', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('bookmarks');
    res.json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/history', protect, async (req, res) => {
  try {
    const { animeId, episode, progress } = req.body;

    const user = await User.findById(req.user._id);

    const historyIndex = user.watchHistory.findIndex(
      h => h.anime.toString() === animeId
    );

    if (historyIndex > -1) {
      user.watchHistory[historyIndex] = {
        anime: animeId,
        episode,
        progress,
        lastWatched: Date.now()
      };
    } else {
      user.watchHistory.push({
        anime: animeId,
        episode,
        progress,
        lastWatched: Date.now()
      });
    }

    await user.save();
    res.json(user.watchHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/history', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'watchHistory.anime',
        select: 'title poster rating totalEpisodes'
      });

    const sortedHistory = user.watchHistory
      .filter(h => h.anime)
      .sort((a, b) => new Date(b.lastWatched) - new Date(a.lastWatched));

    res.json(sortedHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/history/:animeId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.watchHistory = user.watchHistory.filter(
      h => h.anime.toString() !== req.params.animeId
    );
    await user.save();
    res.json(user.watchHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;