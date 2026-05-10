import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play, Pause, Volume2, VolumeX, Maximize, SkipForward,
  SkipBack, Settings, ChevronLeft, ChevronRight, Loader2
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Watch = () => {
  const { id, episode } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const videoRef = useRef(null);
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await axios.get(`/api/anime/${id}`);
        setAnime(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, [id]);

  useEffect(() => {
    const saveProgress = async () => {
      if (user && currentTime > 0) {
        try {
          await axios.post('/api/user/history', {
            animeId: id,
            episode: parseInt(episode),
            progress: currentTime
          });
        } catch (err) {
          console.error(err);
        }
      }
    };

    const interval = setInterval(saveProgress, 30000);
    return () => clearInterval(interval);
  }, [user, id, episode, currentTime]);

  useEffect(() => {
    if (anime && episode) {
      const ep = anime.episodes?.find(e => e.number === parseInt(episode));
      if (ep?.videoUrl && videoRef.current) {
        videoRef.current.load();
        setPlaying(true);
      }
    }
  }, [anime, episode]);

  useEffect(() => {
    let timeout;
    if (playing) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [playing, showControls]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = percent * duration;
    }
  };

  const skip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const changeVolume = (e) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value;
    }
    setMuted(value === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const changeEpisode = (newEpisode) => {
    if (newEpisode >= 1 && newEpisode <= (anime?.episodes?.length || 0)) {
      navigate(`/watch/${id}/${newEpisode}`);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary">
        <Loader2 className="w-10 h-10 text-accent-pink animate-spin" />
      </div>
    );
  }

  const currentEpisode = anime?.episodes?.find(e => e.number === parseInt(episode));

  return (
    <div className="min-h-screen bg-primary pt-16">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1">
          <div
            className="relative bg-black aspect-video"
            onMouseMove={() => setShowControls(true)}
            onMouseLeave={() => playing && setShowControls(false)}
          >
            <video
              ref={videoRef}
              className="w-full h-full"
              src={currentEpisode?.videoUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              className="absolute bottom-0 left-0 right-0 p-4 space-y-4"
            >
              <div
                className="h-1 bg-white/20 rounded-full cursor-pointer group relative"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-accent-pink rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={() => skip(-10)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <SkipBack className="w-5 h-5 text-white" />
                  </button>
                  <button onClick={togglePlay} className="p-3 bg-accent-pink rounded-full hover:scale-110 transition-transform">
                    {playing ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-1" />
                    )}
                  </button>
                  <button onClick={() => skip(10)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <SkipForward className="w-5 h-5 text-white" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button onClick={toggleMute} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      {muted ? (
                        <VolumeX className="w-5 h-5 text-white" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-white" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={muted ? 0 : volume}
                      onChange={changeVolume}
                      className="w-20 h-1 accent-accent-pink"
                    />
                  </div>

                  <span className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Settings className="w-5 h-5 text-white" />
                  </button>
                  <button onClick={toggleFullscreen} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Maximize className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => navigate(`/anime/${id}`)}
                className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Details
              </button>
              <h1 className="text-xl font-outfit font-bold text-white">
                {anime?.title} - Episode {episode}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => changeEpisode(parseInt(episode) - 1)}
                disabled={parseInt(episode) === 1}
                className="px-4 py-2 bg-secondary rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-tertiary transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => changeEpisode(parseInt(episode) + 1)}
                disabled={parseInt(episode) === anime?.episodes?.length}
                className="px-4 py-2 bg-secondary rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-tertiary transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 bg-secondary border-l border-white/10 p-4">
          <h3 className="text-lg font-outfit font-bold text-white mb-4">Episodes</h3>
          <div className="space-y-2 max-h-[70vh] overflow-y-auto">
            {anime?.episodes?.map((ep) => (
              <Link
                key={ep.number}
                to={`/watch/${id}/${ep.number}`}
                className={`block p-3 rounded-lg transition-colors ${
                  parseInt(episode) === ep.number
                    ? 'bg-accent-pink text-white'
                    : 'bg-tertiary hover:bg-white/10 text-text-secondary hover:text-white'
                }`}
              >
                <span className="font-medium">Episode {ep.number}</span>
                <p className="text-sm opacity-70 line-clamp-1">{ep.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;