import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, Star } from 'lucide-react';
import axios from 'axios';

const HeroSlider = () => {
  const [featured, setFeatured] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get('/api/anime/featured');
        setFeatured(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeatured();
  }, []);

  useEffect(() => {
    if (featured.length > 1) {
      const timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % featured.length);
      }, 8000);
      return () => clearInterval(timer);
    }
  }, [featured.length]);

  if (!featured.length) return null;

  const anime = featured[current];

  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={anime.banner || anime.poster}
            alt={anime.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
        <motion.div
          key={`content-${current}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-accent-pink/20 text-accent-pink text-sm rounded-full">
              {anime.status}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-yellow-400 font-semibold">
                {anime.rating?.toFixed(1)}
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold text-white mb-4">
            {anime.title}
          </h1>

          <p className="text-text-secondary text-lg mb-6 line-clamp-3">
            {anime.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {anime.genres?.slice(0, 4).map((genre) => (
              <span
                key={genre}
                className="px-3 py-1 bg-white/10 text-white/80 text-sm rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to={`/watch/${anime._id}/1`}
              className="glow-btn flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch Now
            </Link>
            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add to List
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {featured.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-12 h-1.5 rounded-full transition-all ${
              index === current
                ? 'bg-accent-pink w-16'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;