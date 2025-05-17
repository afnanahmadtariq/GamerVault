import { connect } from 'mongoose';
import Game from '../models/Game.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const games = [
  {
    name: 'Epic Quest',
    description: 'An immersive RPG adventure spanning multiple worlds and dimensions.',
    image: '/games/epic-quest.jpg',
    releaseDate: new Date('2022-05-15'),
    publisher: 'Legendary Games',
    genre: ['RPG', 'Adventure', 'Fantasy'],
    achievementsCount: 150
  },
  {
    name: 'Dragon Riders',
    description: 'Soar through the skies on the back of your own dragon in this epic fantasy adventure.',
    image: '/games/dragon-riders.jpg',
    releaseDate: new Date('2023-01-22'),
    publisher: 'Sky Studios',
    genre: ['Fantasy', 'Adventure', 'Flying'],
    achievementsCount: 85
  },
  {
    name: 'Wizard Wars',
    description: 'Duel other wizards in a battle of magical skill and strategy.',
    image: '/games/wizard-wars.jpg',
    releaseDate: new Date('2022-08-10'),
    publisher: 'Arcane Entertainment',
    genre: ['Strategy', 'Magic', 'Competitive'],
    achievementsCount: 120
  },
  {
    name: 'Shadow Assassin',
    description: 'Stealth action game where you play as an elite assassin in a world of shadows.',
    image: '/games/shadow-assassin.jpg',
    releaseDate: new Date('2023-03-05'),
    publisher: 'Midnight Studios',
    genre: ['Stealth', 'Action', 'Adventure'],
    achievementsCount: 90
  },
  {
    name: 'Racing Legends',
    description: 'High-octane racing with mythical vehicles and supernatural tracks.',
    image: '/games/racing-legends.jpg',
    releaseDate: new Date('2021-11-15'),
    publisher: 'Speed Demons',
    genre: ['Racing', 'Sports', 'Arcade'],
    achievementsCount: 75
  }
];

async function seedGames() {
  try {
    await connect(MONGODB_URI as string);
    console.log('Connected to MongoDB successfully');
    
    // Delete existing games
    await Game.deleteMany({});
    console.log('Cleared existing games');
    
    // Insert new games
    const result = await Game.insertMany(games);
    console.log(`${result.length} games seeded successfully`);
    
    return result;
  } catch (error) {
    console.error('Error seeding games:', error);
    throw error;
  }
}

export default seedGames;

// Allow running this script directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedGames()
    .then(() => {
      console.log('Games seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Failed to seed games:', error);
      process.exit(1);
    });
}
