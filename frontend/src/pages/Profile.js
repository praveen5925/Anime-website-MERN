import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Clock, Play, LogOut, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/user/profile');
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-accent-pink animate-spin" />
      </div>
    );
  }

  if (!profile) return null;

  const continueWatching = profile.watchHistory?.slice(0, 4) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 mb-8"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={profile.avatar}
            alt={profile.username}
            className="w-32 h-32 rounded-full border-4 border-accent-pink"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-outfit font-bold text-white mb-2">
              {profile.username}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-2 text-text-secondary mb-4">
              <Mail className="w-4 h-4" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-text-secondary">
              <Calendar className="w-4 h-4" />
              <span>Joined {new Date(profile.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="px-6 py-3 bg-accent-pink/20 text-accent-pink rounded-xl hover:bg-accent-pink/30 transition-colors flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </motion.div>

      {continueWatching.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-outfit font-bold text-white mb-6 flex items-center gap-2">
            <Play className="w-6 h-6 text-accent-pink" />
            Continue Watching
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {continueWatching.map((item) => (
              <Link
                key={item.anime?._id}
                to={`/watch/${item.anime?._id}/${item.episode}`}
                className="group"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
                  <img
                    src={item.anime?.poster}
                    alt={item.anime?.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Play className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <div
                      className="h-full bg-accent-pink"
                      style={{ width: `${(item.progress / (item.anime?.totalEpisodes * 1440)) * 100}%` }}
                    />
                  </div>
                </div>
                <h3 className="text-white font-medium text-sm line-clamp-1">
                  {item.anime?.title}
                </h3>
                <p className="text-text-secondary text-xs">
                  Episode {item.episode}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-outfit font-bold text-white mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-accent-pink" />
            Watch History
          </h2>
          <Link
            to="/history"
            className="block text-accent-pink hover:text-accent-pink/80 transition-colors"
          >
            View all history →
          </Link>
        </section>

        <section>
          <h2 className="text-2xl font-outfit font-bold text-white mb-6 flex items-center gap-2">
            <User className="w-6 h-6 text-accent-pink" />
            Bookmarks
          </h2>
          <Link
            to="/bookmarks"
            className="block text-accent-pink hover:text-accent-pink/80 transition-colors"
          >
            View all bookmarks →
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Profile;