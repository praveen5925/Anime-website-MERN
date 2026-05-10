const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  number: Number,
  title: String,
  videoUrl: String,
  thumbnail: String,
  duration: Number
});

const animeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  titleEnglish: String,
  description: String,
  banner: String,
  poster: String,
  genres: [String],
  episodes: [episodeSchema],
  rating: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['airing', 'completed', 'upcoming'],
    default: 'airing'
  },
  releaseYear: Number,
  studio: String,
  totalEpisodes: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    enum: ['tv', 'movie', 'ova', 'special'],
    default: 'tv'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

animeSchema.index({ title: 'text', titleEnglish: 'text' });

module.exports = mongoose.model('Anime', animeSchema);