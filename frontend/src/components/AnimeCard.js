import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const AnimeCard = ({ anime, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={`/anime/${anime._id}`} className="block group">
        <div className="anime-card aspect-[2/3]">
          <img
            src={anime.poster || anime.banner}
            alt={anime.title}
            className="anime-poster w-full h-full object-cover"
            loading="lazy"
          />
          <div className="anime-overlay">
            <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
              {anime.title}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 rating-star fill-current" />
                <span className="text-yellow-400 text-xs font-medium">
                  {anime.rating?.toFixed(1)}
                </span>
              </div>
              <span className="text-text-secondary text-xs">
                {anime.totalEpisodes} eps
              </span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {anime.genres?.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="text-[10px] px-2 py-0.5 bg-accent-pink/20 text-accent-pink rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>
    </motion.div>
  );
};

export default AnimeCard;