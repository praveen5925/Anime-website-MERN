# AniVerse - Modern Anime Streaming & Recommendation Platform

## Project Overview
- **Project Name**: AniVerse
- **Type**: Full-stack web application (Anime Streaming Platform)
- **Core Functionality**: Premium anime streaming with personalized recommendations, community features, and seamless viewing experience
- **Target Users**: Anime enthusiasts seeking a premium streaming experience with social features

## Tech Stack
- **Frontend**: React 18 + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **Real-time**: Socket.io for chat
- **State Management**: Context API + useReducer

---

## UI/UX Specification

### Color Palette
```css
--bg-primary: #0a0a0f;          /* Deep black background */
--bg-secondary: #12121a;        /* Card backgrounds */
--bg-tertiary: #1a1a25;         /* Elevated surfaces */
--accent-primary: #ff3366;      /* Hot pink accent */
--accent-secondary: #7c3aed;    /* Purple accent */
--accent-gradient: linear-gradient(135deg, #ff3366 0%, #7c3aed 100%);
--text-primary: #ffffff;
--text-secondary: #a0a0b0;
--text-muted: #6b6b7b;
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--glass-bg: rgba(255, 255, 255, 0.05);
--glass-border: rgba(255, 255, 255, 0.1);
```

### Typography
- **Primary Font**: 'Outfit', sans-serif (Google Fonts)
- **Secondary Font**: 'DM Sans', sans-serif (Google Fonts)
- **Heading Sizes**:
  - H1: 3.5rem (56px)
  - H2: 2.5rem (40px)
  - H3: 1.75rem (28px)
  - H4: 1.25rem (20px)
- **Body**: 1rem (16px)
- **Small**: 0.875rem (14px)

### Spacing System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1440px

---

## Component Specifications

### 1. Navigation Bar
- **Height**: 72px (desktop), 64px (mobile)
- **Background**: Glassmorphism effect with blur
- **Logo**: Animated glow effect on hover
- **Menu Items**: Smooth underline animation on hover
- **Mobile**: Hamburger icon with slide-in menu

### 2. Sidebar (Mobile)
- **Width**: 280px
- **Animation**: Slide from left with fade backdrop
- **Items**: Icon + Label with active state glow

### 3. Anime Card
- **Size**: 200px x 300px (poster ratio 2:3)
- **Border Radius**: 12px
- **Hover Effect**: Scale 1.05, glow shadow, image zoom
- **Overlay**: Gradient on hover showing title + rating

### 4. Hero Slider
- **Height**: 70vh (desktop), 50vh (mobile)
- **Auto-play**: 8 seconds interval
- **Transition**: Fade with scale effect
- **Content**: Title, description, buttons

### 5. Video Player
- **Aspect Ratio**: 16:9
- **Controls**: Custom styled with glow effects
- **Features**: Fullscreen, skip, speed, progress

### 6. Chat Interface
- **Message Bubbles**: Glassmorphism style
- **Online Indicator**: Green pulse animation
- **Timestamp**: Subtle gray text

---

## Page Layouts

### 1. Home Page
- Hero slider with 5 featured anime
- Section: "Top Airing" (horizontal scroll)
- Section: "Trending Now" (grid)
- Section: "Most Popular" (grid)
- Section: "Recently Added" (horizontal scroll)
- Section: "Recommended For You" (personalized)

### 2. Anime Details Page
- Banner background (blurred)
- Poster + Info section
- Episode list sidebar
- Related anime section
- Comments section

### 3. Video Player Page
- Full-width video player
- Episode navigation (floating)
- Video controls overlay

### 4. Profile Page
- User info card
- Continue Watching section
- Bookmarks grid
- Watch history list

### 5. Genre Page
- Genre filter tabs
- Anime grid with filtering

### 6. Chat Page
- Message list
- Input area
- Online users sidebar

---

## Functionality Specification

### Authentication System
1. **Signup**: username, email, password, confirm password
2. **Login**: email + password
3. **JWT**: Token stored in localStorage
4. **Middleware**: Auth check on protected routes
5. **Session**: 7 days expiration

### Bookmark System
- Toggle bookmark on any anime
- Store in user document
- Real-time UI update

### Watch History
- Auto-save on video play
- Track episode progress
- Display in profile

### Search
- Debounced input (300ms)
- Search by title
- Live suggestions dropdown

### Chat
- Real-time messages via Socket.io
- Username + message
- Auto-scroll to bottom

---

## Database Schema

### User Schema
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  avatar: String (default),
  bookmarks: [ObjectId], // Anime references
  watchHistory: [{
    anime: ObjectId,
    episode: Number,
    progress: Number, // seconds watched
    lastWatched: Date
  }],
  preferences: {
    favoriteGenres: [String]
  },
  createdAt: Date
}
```

### Anime Schema
```javascript
{
  title: String (required),
  titleEnglish: String,
  description: String,
  banner: String,
  poster: String,
  genres: [String],
  episodes: [{
    number: Number,
    title: String,
    videoUrl: String,
    thumbnail: String,
    duration: Number
  }],
  rating: Number,
  status: String, // 'airing', 'completed', 'upcoming'
  releaseYear: Number,
  studio: String,
  totalEpisodes: Number,
  createdAt: Date
}
```

---

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me (protected)
- POST /api/auth/logout

### Anime
- GET /api/anime (with pagination, filters)
- GET /api/anime/:id
- GET /api/anime/featured
- GET /api/anime/search?q=

### User
- GET /api/user/profile (protected)
- PUT /api/user/profile (protected)
- POST /api/user/bookmark/:animeId (protected)
- DELETE /api/user/bookmark/:animeId (protected)
- GET /api/user/bookmarks (protected)
- POST /api/user/history (protected)
- GET /api/user/history (protected)

### Chat
- GET /api/chat/messages
- Socket.io events: join, message, online

---

## Animation Specifications

### Page Transitions
- Fade + slide up (200ms ease-out)
- Stagger children (50ms delay each)

### Hero Slider
- Auto-transition: 8s interval
- Slide effect: translateX with opacity

### Card Hover
- Scale: 1.05
- Shadow: 0 20px 40px rgba(255, 51, 102, 0.3)
- Duration: 300ms ease

### Button Interactions
- Scale: 0.95 on click
- Background shift on hover
- Ripple effect

### Loading States
- Skeleton with shimmer animation
- Pulse effect on placeholders

---

## Acceptance Criteria

### Visual
- [ ] Dark theme with purple/pink accents
- [ ] Glassmorphism on cards and overlays
- [ ] Smooth animations on all interactions
- [ ] Responsive on all breakpoints
- [ ] Proper image lazy loading

### Functional
- [ ] User can register and login
- [ ] JWT authentication works
- [ ] Bookmarks persist in database
- [ ] Watch history saves automatically
- [ ] Search returns relevant results
- [ ] Chat messages send/receive in real-time

### Performance
- [ ] Page loads under 3 seconds
- [ ] Smooth 60fps animations
- [ ] No layout shifts on load