import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Bookmark, Clock, Star, Calendar, Film, Loader2, Check } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AnimeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await axios.get(`/api/anime/${id}`);
        setAnime(res.data);
        if (user) {
          const userRes = await axios.get('/api/user/profile');
          const bookmarks = userRes.data.bookmarks || [];
          setIsBookmarked(bookmarks.some(b => b._id === id));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, [id, user]);

  const toggleBookmark = async () => {
    if (!user) return navigate('/login');
    try {
      const res = await axios.post(`/api/user/bookmark/${id}`);
      setIsBookmarked(res.data.includes(id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-accent-pink animate-spin" />
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-white">Anime not found</h2>
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-[60vh] min-h-[400px]">
        <div className="absolute inset-0">
          <img
            src={anime.banner || anime.poster}
            alt={anime.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pt-32 pb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-shrink-0"
            >
              <img
                src={anime.poster}
                alt={anime.title}
                className="w-64 rounded-2xl shadow-2xl border border-white/10"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-accent-pink/20 text-accent-pink text-sm rounded-full capitalize">
                  {anime.status}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-yellow-400 font-semibold">
                    {anime.rating?.toFixed(1)}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-outfit font-bold text-white mb-4">
                {anime.title}
              </h1>

              {anime.titleEnglish && (
                <p className="text-text-secondary text-lg mb-4">
                  {anime.titleEnglish}
                </p>
              )}

              <p className="text-text-secondary mb-6 line-clamp-4">
                {anime.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {anime.genres?.map((genre) => (
                  <Link
                    key={genre}
                    to={`/genres?genre=${genre}`}
                    className="px-3 py-1 bg-white/10 text-white/80 text-sm rounded-full hover:bg-accent-pink/20 hover:text-accent-pink transition-colors"
                  >
                    {genre}
                  </Link>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="glass-card p-4">
                  <div className="flex items-center gap-2 text-text-secondary mb-1">
                    <Film className="w-4 h-4" />
                    <span className="text-sm">Studio</span>
                  </div>
                  <p className="text-white font-medium">{anime.studio || 'Unknown'}</p>
                </div>
                <div className="glass-card p-4">
                  <div className="flex items-center gap-2 text-text-secondary mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Year</span>
                  </div>
                  <p className="text-white font-medium">{anime.releaseYear}</p>
                </div>
                <div className="glass-card p-4">
                  <div className="flex items-center gap-2 text-text-secondary mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Episodes</span>
                  </div>
                  <p className="text-white font-medium">{anime.totalEpisodes}</p>
                </div>
                <div className="glass-card p-4">
                  <div className="flex items-center gap-2 text-text-secondary mb-1">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">Rating</span>
                  </div>
                  <p className="text-white font-medium">{anime.rating?.toFixed(1)}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  to={`/watch/${anime._id}/1`}
                  className="glow-btn flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Start Watching
                </Link>
                <button
                  onClick={toggleBookmark}
                  className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                    isBookmarked
                      ? 'bg-accent-pink text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {isBookmarked ? (
                    <>
                      <Check className="w-5 h-5" />
                      Bookmarked
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-5 h-5" />
                      Add Bookmark
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-outfit font-bold text-white mb-6">
          Episodes ({anime.episodes?.length || 0})
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {anime.episodes?.slice(0, 12).map((episode) => (
            <Link
              key={episode.number}
              to={`/watch/${anime._id}/${episode.number}`}
              className="glass-card p-4 hover:border-accent-pink/50 transition-all group"
            >
              <div className="aspect-video mb-3 rounded-lg overflow-hidden bg-secondary">
                <img
                  src={episode.thumbnail || anime.poster}
                  alt={episode.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <p className="text-white font-medium text-sm">
                Episode {episode.number}
              </p>
              <p className="text-text-secondary text-xs line-clamp-1">
                {episode.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;