import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import AnimeDetails from './pages/AnimeDetails';
import Watch from './pages/Watch';
import Profile from './pages/Profile';
import Bookmarks from './pages/Bookmarks';
import History from './pages/History';
import Genres from './pages/Genres';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-primary">
          <Navbar />
          <Sidebar />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/anime/:id" element={<AnimeDetails />} />
              <Route path="/watch/:id/:episode" element={<Watch />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/history" element={<History />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;