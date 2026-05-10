import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
import axios from 'axios';
import AnimeCard from '../components/AnimeCard';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/anime/search?q=${debouncedQuery}`);
        setResults(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-outfit font-bold text-white mb-4 flex items-center gap-3">
          <SearchIcon className="w-8 h-8 text-accent-pink" />
          Search Results
        </h1>
        {query && (
          <p className="text-text-secondary">
            {loading ? 'Searching...' : `${results.length} results for "${query}"`}
          </p>
        )}
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-accent-pink animate-spin" />
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-20">
          {query ? (
            <>
              <SearchIcon className="w-16 h-16 text-text-muted mx-auto mb-4" />
              <h2 className="text-xl text-white mb-2">No results found</h2>
              <p className="text-text-secondary">Try searching with different keywords</p>
            </>
          ) : (
            <h2 className="text-xl text-white">Start typing to search</h2>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {results.map((anime, index) => (
            <AnimeCard key={anime._id} anime={anime} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;