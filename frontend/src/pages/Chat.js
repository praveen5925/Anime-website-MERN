import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import io from 'socket.io-client';
import axios from 'axios';
import { Send, MessageSquare, Loader2, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Chat = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    const fetchMessages = async () => {
      try {
        const res = await axios.get('/api/chat/messages');
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => newSocket.close();
  }, [user, authLoading, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket || !user) return;

    const messageData = {
      username: user.username,
      avatar: user.avatar,
      message: newMessage,
      room: 'global',
      createdAt: new Date().toISOString()
    };

    socket.emit('send_message', messageData);
    setMessages((prev) => [...prev, messageData]);
    setNewMessage('');

    axios.post('/api/chat/messages', messageData);
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-accent-pink animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-80px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card h-full flex flex-col"
      >
        <div className="p-4 border-b border-white/10">
          <h1 className="text-xl font-outfit font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-accent-pink" />
            Anime Community Chat
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.username === user?.username ? 'flex-row-reverse' : ''}`}
            >
              <img
                src={msg.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.username}`}
                alt={msg.username}
                className="w-10 h-10 rounded-full"
              />
              <div className={`max-w-[70%] ${msg.username === user?.username ? 'text-right' : ''}`}>
                <p className="text-sm text-text-secondary mb-1">{msg.username}</p>
                <div className={`inline-block px-4 py-2 rounded-2xl ${
                  msg.username === user?.username
                    ? 'bg-accent-pink text-white'
                    : 'bg-tertiary text-white'
                }`}>
                  {msg.message}
                </div>
                <p className="text-xs text-text-muted mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="p-4 border-t border-white/10">
          <div className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="input-field flex-1"
            />
            <button
              type="submit"
              className="glow-btn px-6"
              disabled={!newMessage.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Chat;