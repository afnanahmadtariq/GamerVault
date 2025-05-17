// Simple JavaScript seed file
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Configure dotenv
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '..', '.env.local');

console.log(`Looking for .env.local at: ${envPath}`);
if (!fs.existsSync(envPath)) {
  console.error(`.env.local file not found at ${envPath}`);
  console.log('Available files in directory:');
  console.log(fs.readdirSync(path.dirname(envPath)));
}

dotenv.config({ path: envPath });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI environment variable not found. Please check your .env.local file.');
  console.log('Available environment variables:', Object.keys(process.env).filter(key => !key.includes('=')));
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Game model schema
const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true
  },
  image: {
    type: String
  },
  releaseDate: {
    type: Date
  },
  publisher: {
    type: String,
    trim: true
  },
  genre: [{
    type: String,
    trim: true
  }],
  achievementsCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Achievement model schema
const AchievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Achievement name is required"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true
  },
  image: {
    type: String
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: [true, "Game reference is required"]
  },
  points: {
    type: Number,
    default: 10
  },
  rarity: {
    type: String,
    enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
    default: 'common'
  },
  unlockCriteria: {
    type: String,
    trim: true
  }
}, { timestamps: true });

// NFT model schema
const NFTSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "NFT name is required"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true
  },
  image: {
    type: String,
    required: [true, "Image URL is required"]
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  },
  rarity: {
    type: String,
    enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
    default: 'common'
  },
  currentOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  price: {
    type: Number,
    default: 0
  },
  isForSale: {
    type: Boolean,
    default: false
  },
  attributes: {
    type: Map,
    of: String
  }
}, { timestamps: true });

// Define models
const Game = mongoose.models.Game || mongoose.model('Game', GameSchema);
const Achievement = mongoose.models.Achievement || mongoose.model('Achievement', AchievementSchema);
const NFT = mongoose.models.NFT || mongoose.model('NFT', NFTSchema);

// Sample data
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
    name: 'Cosmic Racer',
    description: 'High-speed racing through space and time. Compete against the best pilots in the galaxy.',
    image: '/games/cosmic-racer.jpg',
    releaseDate: new Date('2023-01-10'),
    publisher: 'Speed Studios',
    genre: ['Racing', 'Sports', 'Sci-Fi'],
    achievementsCount: 75
  },
  {
    name: 'Tactical Warfare',
    description: 'Strategic military combat simulator with realistic physics and advanced AI.',
    image: '/games/tactical-warfare.jpg',
    releaseDate: new Date('2021-11-25'),
    publisher: 'Battle Games Inc.',
    genre: ['Strategy', 'Simulation', 'Action'],
    achievementsCount: 125
  },
  {
    name: 'Mystic Legends',
    description: 'MMORPG set in a vast fantasy world filled with magic, monsters, and mystery.',
    image: '/games/mystic-legends.jpg',
    releaseDate: new Date('2020-08-12'),
    publisher: 'Fantasy Realms',
    genre: ['MMORPG', 'Fantasy', 'Adventure'],
    achievementsCount: 300
  },
  {
    name: 'Urban Survival',
    description: 'Post-apocalyptic survival game set in abandoned cities overrun by zombies.',
    image: '/games/urban-survival.jpg',
    releaseDate: new Date('2022-09-30'),
    publisher: 'Wasteland Studios',
    genre: ['Survival', 'Horror', 'Open World'],
    achievementsCount: 100
  }
];

async function seedGames() {
  try {
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

async function seedAchievements(seededGames) {
  try {
    // Delete existing achievements
    await Achievement.deleteMany({});
    console.log('Cleared existing achievements');
    
    const achievements = [];
    
    // For each game, create some achievements
    for (const game of seededGames) {
      const gameAchievements = [
        {
          name: `${game.name} Master`,
          description: `Complete all challenges in ${game.name}`,
          image: `/achievements/${game.name.toLowerCase().replace(/\s+/g, '-')}-master.jpg`,
          game: game._id,
          points: 100,
          rarity: 'legendary',
          unlockCriteria: 'Complete 100% of the game'
        },
        {
          name: `${game.name} Beginner`,
          description: `Complete the tutorial in ${game.name}`,
          image: `/achievements/${game.name.toLowerCase().replace(/\s+/g, '-')}-beginner.jpg`,
          game: game._id,
          points: 10,
          rarity: 'common',
          unlockCriteria: 'Complete the tutorial'
        },
        {
          name: `${game.name} Explorer`,
          description: `Discover all locations in ${game.name}`,
          image: `/achievements/${game.name.toLowerCase().replace(/\s+/g, '-')}-explorer.jpg`,
          game: game._id,
          points: 50,
          rarity: 'rare',
          unlockCriteria: 'Visit all map locations'
        }
      ];
      
      achievements.push(...gameAchievements);
    }
    
    // Insert achievements
    const result = await Achievement.insertMany(achievements);
    console.log(`${result.length} achievements seeded successfully`);
    
    return result;
  } catch (error) {
    console.error('Error seeding achievements:', error);
    throw error;
  }
}

async function seedNFTs(seededGames) {
  try {
    // Delete existing NFTs
    await NFT.deleteMany({});
    console.log('Cleared existing NFTs');
    
    const nfts = [];
    
    // For each game, create some NFTs
    for (const game of seededGames) {
      // Common NFTs
      for (let i = 1; i <= 3; i++) {
        nfts.push({
          name: `${game.name} Common Item ${i}`,
          description: `A common item from ${game.name}`,
          image: `/nfts/${game.name.toLowerCase().replace(/\s+/g, '-')}-common-${i}.jpg`,
          game: game._id,
          rarity: 'common',
          price: 5 + Math.floor(Math.random() * 10),
          isForSale: Math.random() > 0.5,
          attributes: {
            level: `${Math.floor(Math.random() * 10) + 1}`,
            power: `${Math.floor(Math.random() * 50) + 10}`,
            type: ['Weapon', 'Armor', 'Consumable'][Math.floor(Math.random() * 3)]
          }
        });
      }
      
      // Rare NFTs
      for (let i = 1; i <= 2; i++) {
        nfts.push({
          name: `${game.name} Rare Item ${i}`,
          description: `A rare and valuable item from ${game.name}`,
          image: `/nfts/${game.name.toLowerCase().replace(/\s+/g, '-')}-rare-${i}.jpg`,
          game: game._id,
          rarity: 'rare',
          price: 50 + Math.floor(Math.random() * 100),
          isForSale: Math.random() > 0.7,
          attributes: {
            level: `${Math.floor(Math.random() * 20) + 10}`,
            power: `${Math.floor(Math.random() * 100) + 50}`,
            type: ['Legendary Weapon', 'Epic Armor', 'Mythic Artifact'][Math.floor(Math.random() * 3)]
          }
        });
      }
      
      // Legendary NFT
      nfts.push({
        name: `${game.name} Legendary Artifact`,
        description: `The most valuable and rare item from ${game.name}`,
        image: `/nfts/${game.name.toLowerCase().replace(/\s+/g, '-')}-legendary.jpg`,
        game: game._id,
        rarity: 'legendary',
        price: 500 + Math.floor(Math.random() * 500),
        isForSale: Math.random() > 0.8,
        attributes: {
          level: `${Math.floor(Math.random() * 50) + 50}`,
          power: `${Math.floor(Math.random() * 500) + 500}`,
          type: 'Divine Artifact'
        }
      });
    }
    
    // Insert NFTs
    const result = await NFT.insertMany(nfts);
    console.log(`${result.length} NFTs seeded successfully`);
    
    return result;
  } catch (error) {
    console.error('Error seeding NFTs:', error);
    throw error;
  }
}

// Main seeding function
async function seedAll() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');
    
    console.log('=== Starting seeding process ===');
    
    // Seed games
    console.log('\n=== Seeding Games ===');
    const seededGames = await seedGames();
    
    // Seed achievements
    console.log('\n=== Seeding Achievements ===');
    await seedAchievements(seededGames);
    
    // Seed NFTs
    console.log('\n=== Seeding NFTs ===');
    await seedNFTs(seededGames);
    
    console.log('\n=== All data seeded successfully ===');
    
    process.exit(0);
  } catch (error) {
    console.error('Seed process failed:', error);
    process.exit(1);
  }
}

// Run the seeding operation
seedAll();
