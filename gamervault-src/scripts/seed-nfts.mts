import { connect } from 'mongoose';
import NFT from '../models/NFT.js';
import User from '../models/User.js';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { configureEnv } from '../lib/env-config.js';

// Configure environment variables from multiple sources
configureEnv();

const MONGODB_URI = process.env.MONGODB_URI;

async function seedNFTs() {
  try {
    await connect(MONGODB_URI as string);
    console.log('Connected to MongoDB successfully');
    
    // Get a user to own the NFTs
    let testUser = await User.findOne({ email: 'test@example.com' });
    
    if (!testUser) {
      testUser = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123', // Will be hashed by the User model
        image: '/placeholder-user.jpg'
      });
      await testUser.save();
      console.log('Created test user');
    }

    // Create another user for marketplace NFTs
    let sellerUser = await User.findOne({ email: 'seller@example.com' });
    
    if (!sellerUser) {
      sellerUser = new User({
        name: 'NFT Seller',
        email: 'seller@example.com',
        password: 'password123', // Will be hashed by the User model
        image: '/placeholder-user.jpg'
      });
      await sellerUser.save();
      console.log('Created seller user');
    }
    
    // Delete existing NFTs
    await NFT.deleteMany({});
    console.log('Cleared existing NFTs');
    
    // Create NFT data
    const nfts = [
      // User's NFTs (not for sale)
      {
        name: 'Legendary Sword',
        image: '/placeholder.svg?height=200&width=200&text=Legendary+Sword',
        game: 'Epic Quest',
        rarity: 'Legendary',
        category: 'Weapon',
        acquiredDate: new Date('2023-05-15'),
        owner: testUser._id,
        description: 'A sword of immense power, forged in dragon fire',
        attributes: {
          damage: 200,
          durability: 1000,
          level: 50
        },
        value: 10000,
        forSale: false
      },
      {
        name: 'Golden Shield',
        image: '/placeholder.svg?height=200&width=200&text=Golden+Shield',
        game: 'Epic Quest',
        rarity: 'Epic',
        category: 'Armor',
        acquiredDate: new Date('2023-06-22'),
        owner: testUser._id,
        description: 'A shield made of pure gold, offering excellent protection',
        attributes: {
          defense: 150,
          durability: 800,
          weight: 10
        },
        value: 7500,
        forSale: false
      },
      {
        name: 'Mystic Staff',
        image: '/placeholder.svg?height=200&width=200&text=Mystic+Staff',
        game: 'Wizard Wars',
        rarity: 'Rare',
        category: 'Weapon',
        acquiredDate: new Date('2023-07-10'),
        owner: testUser._id,
        description: 'A staff imbued with ancient magic',
        attributes: {
          magicPower: 120,
          spellBoost: 25,
          manaReduction: 15
        },
        value: 5000,
        forSale: false
      },
      {
        name: 'Dragon Mount',
        image: '/placeholder.svg?height=200&width=200&text=Dragon+Mount',
        game: 'Dragon Riders',
        rarity: 'Legendary',
        category: 'Mount',
        acquiredDate: new Date('2023-08-05'),
        owner: testUser._id,
        description: 'A fierce and loyal dragon mount',
        attributes: {
          speed: 300,
          stamina: 500,
          firepower: 200
        },
        value: 15000,
        forSale: false
      },
      
      // Marketplace NFTs (for sale)
      {
        name: 'Enchanted Bow',
        image: '/placeholder.svg?height=200&width=200&text=Enchanted+Bow',
        game: 'Epic Quest',
        rarity: 'Epic',
        category: 'Weapon',
        acquiredDate: new Date('2023-04-10'),
        owner: sellerUser._id,
        description: 'A bow that never misses its target',
        attributes: {
          damage: 120,
          range: 100,
          critChance: 25
        },
        value: 8000,
        forSale: true,
        price: 8500
      },
      {
        name: 'Shadow Cloak',
        image: '/placeholder.svg?height=200&width=200&text=Shadow+Cloak',
        game: 'Shadow Assassin',
        rarity: 'Epic',
        category: 'Armor',
        acquiredDate: new Date('2023-03-15'),
        owner: sellerUser._id,
        description: 'A cloak that grants exceptional stealth abilities',
        attributes: {
          stealth: 95,
          movement: 30,
          darkVision: true
        },
        value: 9000,
        forSale: true,
        price: 9500
      },
      {
        name: 'Phoenix Feather',
        image: '/placeholder.svg?height=200&width=200&text=Phoenix+Feather',
        game: 'Wizard Wars',
        rarity: 'Legendary',
        category: 'Collectible',
        acquiredDate: new Date('2023-02-28'),
        owner: sellerUser._id,
        description: 'A rare feather from a phoenix, used in powerful spells',
        attributes: {
          magicBoost: 50,
          fireResistance: 100,
          resurrection: 1
        },
        value: 12000,
        forSale: true,
        price: 15000
      },
      {
        name: 'Racing Chariot',
        image: '/placeholder.svg?height=200&width=200&text=Racing+Chariot',
        game: 'Racing Legends',
        rarity: 'Rare',
        category: 'Mount',
        acquiredDate: new Date('2023-05-20'),
        owner: sellerUser._id,
        description: 'A fast chariot pulled by magical horses',
        attributes: {
          speed: 200,
          handling: 85,
          acceleration: 90
        },
        value: 6000,
        forSale: true,
        price: 6500
      },
      {
        name: 'Dragon Egg',
        image: '/placeholder.svg?height=200&width=200&text=Dragon+Egg',
        game: 'Dragon Riders',
        rarity: 'Epic',
        category: 'Collectible',
        acquiredDate: new Date('2023-04-05'),
        owner: sellerUser._id,
        description: 'A rare dragon egg that will hatch into a loyal companion',
        attributes: {
          species: 'Flame Dragon',
          hatchTime: '30 days',
          potential: 'High'
        },
        value: 10000,
        forSale: true,
        price: 12000
      }
    ];
    
    // Insert NFTs
    const result = await NFT.insertMany(nfts);
    console.log(`${result.length} NFTs seeded successfully`);
    
    return result;
  } catch (error) {
    console.error('Error seeding NFTs:', error);
    throw error;
  }
}

export default seedNFTs;

// Allow running this script directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedNFTs()
    .then(() => {
      console.log('NFTs seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Failed to seed NFTs:', error);
      process.exit(1);
    });
}
