import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-primary/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>

          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-pink to-accent-purple flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-outfit font-bold text-white">
              Ani<span className="text-accent-pink">Verse</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/genres" className="nav-link">Genres</Link>
            <Link to="/chat" className="nav-link">Chats</Link>
          </div>
        </div>

        <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
          <Search className="absolute left-3 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 lg:w-80 pl-10 pr-4 py-2.5 bg-secondary rounded-full border border-white/10 text-white placeholder:text-text-muted focus:outline-none focus:border-accent-pink/50 transition-colors"
          />
        </form>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 hover:bg-white/10 rounded-full transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-8 h-8 rounded-full border-2 border-accent-pink"
                />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-12 w-56 bg-secondary rounded-xl border border-white/10 overflow-hidden"
                  >
                    <div className="p-4 border-b border-white/10">
                      <p className="font-semibold text-white">{user.username}</p>
                      <p className="text-sm text-text-secondary">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-text-secondary hover:text-white transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <Link
                        to="/bookmarks"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-text-secondary hover:text-white transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Bell className="w-4 h-4" />
                        Bookmarks
                      </Link>
                      <button
                        onClick={() => { logout(); setShowUserMenu(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-text-secondary hover:text-accent-pink transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-text-secondary hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="glow-btn px-4 py-2 text-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;