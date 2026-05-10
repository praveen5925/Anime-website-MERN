import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Loader2 } from 'lucide-react';
import axios from 'axios';
import AnimeCard from '../components/AnimeCard';
import HeroSlider from '../components/HeroSlider';

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingRes, popularRes, recentRes] = await Promise.all([
          axios.get('/api/anime/trending'),
          axios.get('/api/anime/popular'),
          axios.get('/api/anime/recent'),
        ]);
        setTrending(trendingRes.data);
        setPopular(popularRes.data);
        setRecent(recentRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-accent-pink animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <HeroSlider />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <AnimeSection title="Trending Now" anime={trending} />
        <AnimeSection title="Most Popular" anime={popular} />
        <AnimeSection title="Recently Added" anime={recent} />
      </div>
    </div>
  );
};

const AnimeSection = ({ title, anime }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-outfit font-bold text-white">{title}</h2>
        <button className="flex items-center gap-1 text-accent-pink hover:text-accent-pink/80 transition-colors">
          <span className="text-sm font-medium">View All</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {anime.slice(0, 12).map((item, index) => (
          <AnimeCard key={item._id} anime={item} index={index} />
        ))}
      </div>
    </motion.section>
  );
};

export default Home;