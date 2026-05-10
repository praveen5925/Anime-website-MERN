const express = require('express');
const router = express.Router();
const Anime = require('../models/Anime');

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, genre, status, search, sort } = req.query;
    const query = {};

    if (genre) query.genres = genre;
    if (status) query.status = status;
    if (search) query.$text = { $search: search };

    let sortOption = { createdAt: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };
    if (sort === 'popular') sortOption = { totalEpisodes: -1 };

    const anime = await Anime.find(query)
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Anime.countDocuments(query);

    res.json({
      anime,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    const anime = await Anime.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } }).limit(10);

    res.json(anime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/featured', async (req, res) => {
  try {
    const featured = await Anime.find({ status: 'airing' })
      .sort({ rating: -1 })
      .limit(5);
    res.json(featured);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/trending', async (req, res) => {
  try {
    const trending = await Anime.find().sort({ rating: -1 }).limit(12);
    res.json(trending);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/popular', async (req, res) => {
  try {
    const popular = await Anime.find().sort({ totalEpisodes: -1 }).limit(12);
    res.json(popular);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/recent', async (req, res) => {
  try {
    const recent = await Anime.find().sort({ createdAt: -1 }).limit(12);
    res.json(recent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/genres', async (req, res) => {
  try {
    const genres = [
      'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
      'Horror', 'Mecha', 'Music', 'Mystery', 'Psychological',
      'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Thriller'
    ];
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/genre/:genre', async (req, res) => {
  try {
    const anime = await Anime.find({ genres: req.params.genre });
    res.json(anime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) {
      return res.status(404).json({ message: 'Anime not found' });
    }
    res.json(anime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;