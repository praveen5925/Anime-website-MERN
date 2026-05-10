import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import AnimeCard from '../components/AnimeCard';

const Genres = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedGenre = searchParams.get('genre') || 'All';
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  const genres = [
    'All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
    'Horror', 'Mecha', 'Music', 'Mystery', 'Psychological',
    'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Thriller'
  ];

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      try {
        if (selectedGenre === 'All') {
          const res = await axios.get('/api/anime');
          setAnime(res.data.anime);
        } else {
          const res = await axios.get(`/api/anime/genre/${selectedGenre}`);
          setAnime(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, [selectedGenre]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-outfit font-bold text-white mb-4">Browse Genres</h1>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSearchParams({ genre })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedGenre === genre
                  ? 'bg-accent-pink text-white'
                  : 'bg-secondary text-text-secondary hover:bg-tertiary hover:text-white'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-accent-pink animate-spin" />
        </div>
      ) : anime.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-text-secondary">No anime found in this genre</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {anime.map((item, index) => (
            <AnimeCard key={item._id} anime={item} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Genres;