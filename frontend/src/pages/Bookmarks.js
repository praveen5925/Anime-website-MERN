import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AnimeCard from '../components/AnimeCard';

const Bookmarks = () => {
  const { user, loading: authLoading } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const res = await axios.get('/api/user/bookmarks');
        setBookmarks(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchBookmarks();
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-accent-pink animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-outfit font-bold text-white flex items-center gap-3">
          <Bookmark className="w-8 h-8 text-accent-pink" />
          My Bookmarks
        </h1>
        <p className="text-text-secondary mt-2">
          {bookmarks.length} anime saved
        </p>
      </motion.div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-20">
          <Bookmark className="w-16 h-16 text-text-muted mx-auto mb-4" />
          <h2 className="text-xl text-white mb-2">No bookmarks yet</h2>
          <p className="text-text-secondary">Start adding anime to your bookmarks!</p>
          <Link
            to="/"
            className="inline-block mt-4 glow-btn"
          >
            Browse Anime
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {bookmarks.map((anime, index) => (
            <AnimeCard key={anime._id} anime={anime} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;