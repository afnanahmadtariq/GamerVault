import { connect } from 'mongoose';
import Achievement from '../models/Achievement.js';
import Game from '../models/Game.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function seedAchievements() {
  try {
    await connect(MONGODB_URI as string);
    console.log('Connected to MongoDB successfully');
    
    // Get game IDs
    const games = await Game.find({}, '_id name');
    if (!games.length) {
      throw new Error('No games found in database. Run seed-games script first.');
    }
    
    // Create a map of game names to IDs
    const gameMap = games.reduce((map: Record<string, string>, game: any) => {
      map[game.name] = game._id.toString();
      return map;
    }, {});
    
    // Delete existing achievements
    await Achievement.deleteMany({});
    console.log('Cleared existing achievements');
    
    // Create achievements for each game
    const achievements = [];
    
    // Epic Quest achievements
    achievements.push(
      {
        name: 'Dragon Slayer',
        game: 'Epic Quest',
        description: 'Defeat the mighty dragon in Epic Quest',
        points: 100,
        image: '/achievements/dragon-slayer.jpg',
        rarity: 'Legendary',
        unlockedBy: [],
        unlockCriteria: 'Defeat the Ancient Dragon in the final battle'
      },
      {
        name: 'Treasure Hunter',
        game: 'Epic Quest',
        description: 'Find all hidden treasure chests',
        points: 50,
        image: '/achievements/treasure-hunter.jpg',
        rarity: 'Epic',
        unlockedBy: [],
        unlockCriteria: 'Find all 25 hidden treasure chests in the world'
      },
      {
        name: 'Master Blacksmith',
        game: 'Epic Quest',
        description: 'Craft 100 items with the blacksmith',
        points: 25,
        image: '/achievements/master-blacksmith.jpg',
        rarity: 'Rare',
        unlockedBy: [],
        unlockCriteria: 'Craft 100 different items using the blacksmith forge'
      }
    );
    
    // Wizard Wars achievements
    achievements.push(
      {
        name: 'Archmage',
        game: 'Wizard Wars',
        description: 'Reach the highest rank in wizard duels',
        points: 75,
        image: '/achievements/archmage.jpg',
        rarity: 'Legendary',
        unlockedBy: [],
        unlockCriteria: 'Win 100 ranked duels and reach the Archmage rank'
      },
      {
        name: 'Spell Collector',
        game: 'Wizard Wars',
        description: 'Learn all spells available in the game',
        points: 50,
        image: '/achievements/spell-collector.jpg',
        rarity: 'Epic',
        unlockedBy: [],
        unlockCriteria: 'Discover and learn all 75 unique spells'
      }
    );
    
    // Dragon Riders achievements
    achievements.push(
      {
        name: 'Sky Master',
        game: 'Dragon Riders',
        description: 'Complete all aerial challenges with perfect scores',
        points: 80,
        image: '/achievements/sky-master.jpg',
        rarity: 'Legendary',
        unlockedBy: [],
        unlockCriteria: 'Complete all 15 aerial challenges with a perfect score'
      },
      {
        name: 'Dragon Whisperer',
        game: 'Dragon Riders',
        description: 'Tame all species of dragons',
        points: 60,
        image: '/achievements/dragon-whisperer.jpg',
        rarity: 'Epic',
        unlockedBy: [],
        unlockCriteria: 'Tame at least one dragon from all 12 species'
      }
    );
    
    // Shadow Assassin achievements
    achievements.push(
      {
        name: 'Ghost',
        game: 'Shadow Assassin',
        description: 'Complete a mission without being detected once',
        points: 90,
        image: '/achievements/ghost.jpg',
        rarity: 'Legendary',
        unlockedBy: [],
        unlockCriteria: 'Complete any mission without triggering any detection alerts'
      },
      {
        name: 'Silent Blade',
        game: 'Shadow Assassin',
        description: 'Eliminate 50 targets silently',
        points: 40,
        image: '/achievements/silent-blade.jpg',
        rarity: 'Rare',
        unlockedBy: [],
        unlockCriteria: 'Perform 50 silent eliminations throughout the game'
      }
    );
    
    // Racing Legends achievements
    achievements.push(
      {
        name: 'Speed Demon',
        game: 'Racing Legends',
        description: 'Win a race with the maximum speed boost active',
        points: 35,
        image: '/achievements/speed-demon.jpg',
        rarity: 'Epic',
        unlockedBy: [],
        unlockCriteria: 'Win any race while having the maximum speed boost active'
      },
      {
        name: 'Circuit Champion',
        game: 'Racing Legends',
        description: 'Win all circuit races on expert difficulty',
        points: 70,
        image: '/achievements/circuit-champion.jpg',
        rarity: 'Legendary',
        unlockedBy: [],
        unlockCriteria: 'Win all 8 circuit races on expert difficulty'
      }
    );
    
    // Insert achievements
    const result = await Achievement.insertMany(achievements);
    console.log(`${result.length} achievements seeded successfully`);
    
    return result;
  } catch (error) {
    console.error('Error seeding achievements:', error);
    throw error;
  }
}

export default seedAchievements;

// Allow running this script directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedAchievements()
    .then(() => {
      console.log('Achievements seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Failed to seed achievements:', error);
      process.exit(1);
    });
}
