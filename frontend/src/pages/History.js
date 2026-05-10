import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Loader2, Trash2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const History = () => {
  const { user, loading: authLoading } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await axios.get('/api/user/history');
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchHistory();
  }, [user, authLoading, navigate]);

  const removeFromHistory = async (animeId) => {
    try {
      await axios.delete(`/api/user/history/${animeId}`);
      setHistory(history.filter(h => h.anime?._id !== animeId));
    } catch (err) {
      console.error(err);
    }
  };

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
          <Clock className="w-8 h-8 text-accent-pink" />
          Watch History
        </h1>
        <p className="text-text-secondary mt-2">
          {history.length} items in your history
        </p>
      </motion.div>

      {history.length === 0 ? (
        <div className="text-center py-20">
          <Clock className="w-16 h-16 text-text-muted mx-auto mb-4" />
          <h2 className="text-xl text-white mb-2">No watch history</h2>
          <p className="text-text-secondary">Start watching anime to see your history!</p>
          <Link
            to="/"
            className="inline-block mt-4 glow-btn"
          >
            Browse Anime
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <motion.div
              key={item.anime?._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-4 flex items-center gap-4 hover:border-accent-pink/30 transition-colors"
            >
              <Link to={`/anime/${item.anime?._id}`}>
                <img
                  src={item.anime?.poster}
                  alt={item.anime?.title}
                  className="w-24 h-36 object-cover rounded-lg"
                />
              </Link>
              <div className="flex-1">
                <Link
                  to={`/anime/${item.anime?._id}`}
                  className="text-xl font-semibold text-white hover:text-accent-pink transition-colors"
                >
                  {item.anime?.title}
                </Link>
                <p className="text-text-secondary">
                  Episode {item.episode}
                </p>
                <p className="text-text-muted text-sm">
                  Watched {new Date(item.lastWatched).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  to={`/watch/${item.anime?._id}/${item.episode}`}
                  className="glow-btn px-4 py-2 text-sm"
                >
                  Continue
                </Link>
                <button
                  onClick={() => removeFromHistory(item.anime?._id)}
                  className="p-2 text-text-secondary hover:text-accent-pink transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;