import seedGames from './seed-games.js';
import seedAchievements from './seed-achievements.js';
import seedNFTs from './seed-nfts.js';
import { connect } from 'mongoose';
import { fileURLToPath } from 'url';
import { configureEnv } from '../lib/env-config.js';

// Configure environment variables from multiple sources
configureEnv();

const MONGODB_URI = process.env.MONGODB_URI;

async function seedAll() {
  try {
    await connect(MONGODB_URI as string);
    console.log('Connected to MongoDB successfully');
    
    console.log('=== Starting seeding process ===');
    
    // Seed games
    console.log('\n=== Seeding Games ===');
    await seedGames();
    
    // Seed achievements
    console.log('\n=== Seeding Achievements ===');
    await seedAchievements();
    
    // Seed NFTs
    console.log('\n=== Seeding NFTs ===');
    await seedNFTs();
    
    console.log('\n=== All data seeded successfully ===');
    
    process.exit(0);
  } catch (error) {
    console.error('Seed process failed:', error);
    process.exit(1);
  }
}

// Allow running this script directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedAll();
}
