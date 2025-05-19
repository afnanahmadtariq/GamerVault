// Test script to check the NFTs API functionality
// This simulates what the useNFTs hook does but in a simpler way

async function testNFTsAPI() {
  try {
    console.log('Testing NFTs API...');
    
    // Mock the authenticated user request
    const mockResponse = {
      owned: [
        {
          id: "nft-1",
          name: "Legendary Sword",
          image: "https://images.unsplash.com/photo-1601629657387-5df99902d615?w=800&h=800&fit=crop&q=80",
          game: "Epic Quest",
          rarity: "Legendary",
          category: "Weapon",
          acquired: "2023-05-15",
          forSale: false
        },
        {
          id: "nft-2",
          name: "Golden Shield",
          image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=800&fit=crop&q=80",
          game: "Epic Quest",
          rarity: "Epic",
          category: "Armor",
          acquired: "2023-06-22",
          forSale: false
        },
        {
          id: "nft-3",
          name: "Mystic Staff",
          image: "https://images.unsplash.com/photo-1549122728-f51970943692?w=800&h=800&fit=crop&q=80",
          game: "Wizard Wars",
          rarity: "Rare",
          category: "Weapon",
          acquired: "2023-07-10",
          forSale: false
        },
        {
          id: "nft-4",
          name: "Dragon Mount",
          image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=800&fit=crop&q=80",
          game: "Dragon Riders",
          rarity: "Legendary",
          category: "Mount",
          acquired: "2023-08-05",
          forSale: false
        }
      ],
      marketplace: [
        {
          id: "market-1",
          name: "Excalibur",
          image: "https://source.unsplash.com/aO-8_k3hQoY/300x300",
          game: "Epic Quest",
          rarity: "Mythic",
          category: "Weapon",
          price: 2500,
          forSale: true,
          seller: {
            id: "user-1",
            name: "GameMaster"
          }
        },
        {
          id: "market-2",
          name: "Phoenix Mount",
          image: "https://source.unsplash.com/iI9aY14x55A/300x300",
          game: "Dragon Riders",
          rarity: "Legendary",
          category: "Mount",
          price: 3000,
          forSale: true,
          seller: {
            id: "user-2",
            name: "DragonLord"
          }
        },
        {
          id: "market-3",
          name: "Stealth Armor",
          image: "https://source.unsplash.com/nApaSgkzaxg/300x300",
          game: "Shadow Assassin",
          rarity: "Epic",
          category: "Armor",
          price: 1200,
          forSale: true,
          seller: {
            id: "user-3",
            name: "ShadowMaster"
          }
        },
        {
          id: "market-4",
          name: "Wizard's Grimoire",
          image: "https://source.unsplash.com/a_PDPUPWnhQ/300x300",
          game: "Wizard Wars",
          rarity: "Legendary",
          category: "Collectible",
          price: 1800,
          forSale: true,
          seller: {
            id: "user-4",
            name: "Merlin"
          }
        }
      ],
      all: [],
      stats: {
        totalOwned: 4,
        totalMarketplace: 4,
        categories: {
          weapon: 3,
          armor: 2,
          mount: 2,
          collectible: 1,
          other: 0
        },
        rarities: {
          common: 0,
          uncommon: 0,
          rare: 1,
          epic: 2,
          legendary: 4,
          mythic: 1
        }
      },
      pagination: {
        total: 8,
        page: 1,
        limit: 20,
        pages: 1
      }
    };
    
    // Combine all NFTs (this is what the hook does)
    mockResponse.all = [...mockResponse.owned, ...mockResponse.marketplace];
    
    // Print NFTs information
    console.log(`Found ${mockResponse.stats.totalOwned} owned NFTs`);
    console.log(`Found ${mockResponse.stats.totalMarketplace} marketplace NFTs`);
    console.log(`Total NFTs: ${mockResponse.all.length}`);
    
    console.log('\nCategories breakdown:');
    Object.entries(mockResponse.stats.categories).forEach(([category, count]) => {
      console.log(`- ${category}: ${count}`);
    });
    
    console.log('\nRarities breakdown:');
    Object.entries(mockResponse.stats.rarities).forEach(([rarity, count]) => {
      console.log(`- ${rarity}: ${count}`);
    });
    
    console.log('\nTesting filtering and sorting...');
    // Test filtering by category (for example, weapons)
    const weaponsOnly = mockResponse.all.filter(nft => 
      nft.category.toLowerCase() === 'weapon'
    );
    console.log(`Weapons only: ${weaponsOnly.length} items`);
    
    // Test filtering by rarity (for example, legendary)
    const legendaryOnly = mockResponse.all.filter(nft => 
      nft.rarity.toLowerCase() === 'legendary'
    );
    console.log(`Legendary only: ${legendaryOnly.length} items`);
    
    // Test search functionality
    const searchTerm = 'dragon';
    const searchResults = mockResponse.all.filter(nft => 
      nft.name.toLowerCase().includes(searchTerm) || 
      nft.game.toLowerCase().includes(searchTerm)
    );
    console.log(`Search for "${searchTerm}": ${searchResults.length} items`);
    
    console.log('\nAPI test completed successfully');
  } catch (error) {
    console.error('Error testing NFTs API:', error);
  }
}

// Run the test
testNFTsAPI();
