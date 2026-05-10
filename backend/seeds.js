const mongoose = require('mongoose');
const Anime = require('./models/Anime');

const animeData = [
  {
    title: "Demon Slayer",
    titleEnglish: "Kimetsu no Yaiba",
    description: "Tanjiro Kamado, a kindhearted boy who lives with his family and makes charcoal, discovers his family slaughtered and his sister Nezuko turned into a demon. He joins the Demon Slayer Corps to find a way to turn his sister back into a human and to hunt down the demon that killed his family.",
    banner: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400",
    genres: ["Action", "Supernatural", "Adventure"],
    rating: 9.5,
    status: "completed",
    releaseYear: 2019,
    studio: "Ufotable",
    totalEpisodes: 26,
    type: "tv",
    episodes: Array.from({ length: 26 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}`,
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200",
      duration: 24
    }))
  },
  {
    title: "Attack on Titan",
    titleEnglish: "Shingeki no Kyojin",
    description: "In a world where humanity lives within cities surrounded by enormous walls due to the Titans, giant humanoid creatures that devour humans seemingly without reason, a young boy named Eren Yeager vows to exterminate all Titans after a tragic event.",
    banner: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=1920",
    poster: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=400",
    genres: ["Action", "Drama", "Fantasy"],
    rating: 9.4,
    status: "completed",
    releaseYear: 2013,
    studio: "MAPPA",
    totalEpisodes: 87,
    type: "tv",
    episodes: Array.from({ length: 12 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}`,
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnail: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=200",
      duration: 24
    }))
  },
  {
    title: "One Piece",
    titleEnglish: "One Piece",
    description: "Monkey D. Luffy sets off on an adventure with his pirate crew in hopes of finding the greatest treasure ever. Along the way, he meets many friends, enemies, and allies who help him in his journey.",
    banner: "https://images.unsplash.com/photo-1535581652167-3d6b986d005f?w=1920",
    poster: "https://images.unsplash.com/photo-1535581652167-3d6b986d005f?w=400",
    genres: ["Action", "Adventure", "Comedy"],
    rating: 9.3,
    status: "airing",
    releaseYear: 1999,
    studio: "Toei Animation",
    totalEpisodes: 1072,
    type: "tv",
    episodes: Array.from({ length: 12 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}`,
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1535581652167-3d6b986d005f?w=200",
      duration: 24
    }))
  },
  {
    title: "Jujutsu Kaisen",
    titleEnglish: "Jujutsu Kaisen",
    description: "Yuji Itadori, a high school student with exceptional physical abilities, stumbles upon a cursed object and becomes the host of a powerful curse named Sukuna. He joins a secret organization of Jujutsu Sorcerers to kill all curses.",
    banner: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1920",
    poster: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400",
    genres: ["Action", "Supernatural", "Horror"],
    rating: 9.2,
    status: "completed",
    releaseYear: 2020,
    studio: "MAPPA",
    totalEpisodes: 24,
    type: "tv",
    episodes: Array.from({ length: 24 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}`,
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200",
      duration: 24
    }))
  },
  {
    title: "My Hero Academia",
    titleEnglish: "Boku no Hero Academia",
    description: "In a world where most people have superpowers called Quirks, Midoriya Izuku dreams of becoming a hero despite being born without powers. His life changes when he meets the greatest hero, All Might.",
    banner: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1920",
    poster: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400",
    genres: ["Action", "Comedy", "School"],
    rating: 9.1,
    status: "completed",
    releaseYear: 2016,
    studio: "Bones",
    totalEpisodes: 113,
    type: "tv",
    episodes: Array.from({ length: 13 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}`,
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      thumbnail: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=200",
      duration: 24
    }))
  },
  {
    title: "Naruto",
    titleEnglish: "Naruto",
    description: "Naruto Uzumaki, a young ninja with a demon fox sealed inside him, dreams of becoming the Hokage, the leader of his village. Through hard work and determination, he grows stronger while making friends and enemies alike.",
    banner: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=1920",
    poster: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400",
    genres: ["Action", "Adventure", "Martial Arts"],
    rating: 9.0,
    status: "completed",
    releaseYear: 2002,
    studio: "Pierrot",
    totalEpisodes: 720,
    type: "tv",
    episodes: Array.from({ length: 12 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}`,
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      thumbnail: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=200",
      duration: 24
    }))
  },
  {
    title: "Death Note",
    titleEnglish: "Death Note",
    description: "A high school student named Light Yagami discovers a notebook that can kill anyone whose name is written in it. He decides to use it to rid the world of criminals, but a mysterious detective known as L opposes him.",
    banner: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=1920",
    poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400",
    genres: ["Mystery", "Psychological", "Thriller"],
    rating: 9.3,
    status: "completed",
    releaseYear: 2006,
    studio: "Madhouse",
    totalEpisodes: 37,
    type: "tv",
    episodes: Array.from({ length: 12 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}`,
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      thumbnail: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=200",
      duration: 24
    }))
  },
  {
    title: "Fullmetal Alchemist",
    titleEnglish: "Fullmetal Alchemist",
    description: "Two brothers search for a Philosopher's Stone after an attempt to revive their deceased mother goes awry and leads them to encounter vast national conspiracy.",
    banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400",
    genres: ["Action", "Adventure", "Drama"],
    rating: 9.4,
    status: "completed",
    releaseYear: 2003,
    studio: "Bones",
    totalEpisodes: 64,
    type: "tv",
    episodes: Array.from({ length: 12 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}`,
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200",
      duration: 24
    }))
  },
  {
    title: "Tokyo Revengers",
    titleEnglish: "Tokyo Revengers",
    description: "Takemichi Hanagaki, a 26-year-old unemployed man, discovers the ability to time travel back 12 years to save his ex-girlfriend and change his fate.",
    banner: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920",
    poster: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
    genres: ["Action", "Drama", "Sci-Fi"],
    rating: 8.8,
    status: "completed",
    releaseYear: 2021,
    studio: "Liden Films",
    totalEpisodes: 24,
    type: "tv",
    episodes: Array.from({ length: 24 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}`,
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200",
      duration: 24
    }))
  },
  {
    title: "Chainsaw Man",
    titleEnglish: "Chainsaw Man",
    description: "Denji is a young man trapped in poverty, working off his deceased father's debt to the yakuza by working as a Devil Hunter with his pet devil Pochita. After being betrayed and killed, he merges with Pochita to become Chainsaw Man.",
    banner: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1920",
    poster: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400",
    genres: ["Action", "Horror", "Supernatural"],
    rating: 8.9,
    status: "completed",
    releaseYear: 2022,
    studio: "MAPPA",
    totalEpisodes: 12,
    type: "tv",
    episodes: Array.from({ length: 12 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}`,
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      thumbnail: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=200",
      duration: 24
    }))
  },
  {
    title: "Spy x Family",
    titleEnglish: "Spy x Family",
    description: "A spy known as Twilight is tasked with infiltrating an elite school by creating a fake family. However, he adopts a telepathic girl as his daughter, and his wife is actually an assassin.",
    banner: "https://images.unsplash.com/photo-1580128665717-022f4a827652?w=1920",
    poster: "https://images.unsplash.com/photo-1580128665717-022f4a827652?w=400",
    genres: ["Action", "Comedy", "Slice of Life"],
    rating: 9.1,
    status: "completed",
    releaseYear: 2022,
    studio: "Wit Studio",
    totalEpisodes: 25,
    type: "tv",
    episodes: Array.from({ length: 12 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}`,
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
      thumbnail: "https://images.unsplash.com/photo-1580128665717-022f4a827652?w=200",
      duration: 24
    }))
  },
  {
    title: "Violet Evergarden",
    titleEnglish: "Violet Evergarden",
    description: "A former soldier named Violet struggles to adjust to life after the war. She takes a job as a letter writer to understand the meaning of the words 'I love you' that her commander once said to her.",
    banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400",
    genres: ["Drama", "Fantasy", "Slice of Life"],
    rating: 9.2,
    status: "completed",
    releaseYear: 2018,
    studio: "Kyoto Animation",
    totalEpisodes: 13,
    type: "tv",
    episodes: Array.from({ length: 13 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}`,
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200",
      duration: 24
    }))
  },
  {
    title: "A Silent Voice",
    titleEnglish: "Koe no Katachi",
    description: "A young man seeks to redeem himself for his past bullying by helping a deaf girl he once tormented in elementary school.",
    banner: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400",
    genres: ["Drama", "Romance"],
    rating: 9.5,
    status: "completed",
    releaseYear: 2016,
    studio: "Kyoto Animation",
    totalEpisodes: 1,
    type: "movie",
    episodes: [{
      number: 1,
      title: "Movie",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200",
      duration: 130
    }]
  },
  {
    title: "Your Name",
    titleEnglish: "Kimi no Na wa",
    description: "Two teenagers mysteriously switch bodies and must navigate each other's lives while trying to find each other.",
    banner: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400",
    genres: ["Drama", "Romance", "Supernatural"],
    rating: 9.4,
    status: "completed",
    releaseYear: 2016,
    studio: "CoMix Wave Films",
    totalEpisodes: 1,
    type: "movie",
    episodes: [{
      number: 1,
      title: "Movie",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=200",
      duration: 106
    }]
  },
  {
    title: "Cyberpunk: Edgerunners",
    titleEnglish: "Cyberpunk: Edgerunners",
    description: "In a dystopian future, a young street kid strives to become an edgerunner: a mercenary outlaw.",
    banner: "https://images.unsplash.com/photo-1535378437327-1e092890e1b8?w=1920",
    poster: "https://images.unsplash.com/photo-1535378437327-1e092890e1b8?w=400",
    genres: ["Action", "Sci-Fi"],
    rating: 8.7,
    status: "completed",
    releaseYear: 2022,
    studio: "Trigger",
    totalEpisodes: 10,
    type: "tv",
    episodes: Array.from({ length: 10 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}`,
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1535378437327-1e092890e1b8?w=200",
      duration: 24
    }))
  },
  {
    title: "Mob Psycho 100",
    titleEnglish: "Mob Psycho 100",
    description: "Mob, a powerful psychic, tries to live a normal life while working part-time and training to become a better person.",
    banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400",
    genres: ["Action", "Comedy", "Supernatural"],
    rating: 9.1,
    status: "completed",
    releaseYear: 2016,
    studio: "Bones",
    totalEpisodes: 36,
    type: "tv",
    episodes: Array.from({ length: 12 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}`,
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200",
      duration: 24
    }))
  }
];

mongoose.connect('mongodb://localhost:27017/aniverse', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to MongoDB');
  await Anime.deleteMany({});
  await Anime.insertMany(animeData);
  console.log('Anime data seeded successfully');
  process.exit();
}).catch(err => console.log(err));