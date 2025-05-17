import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import NFT from "@/models/NFT";

const MAX_LIMIT = 50; // Maximum items per page to prevent abuse

// Helper for consistent error responses
const errorResponse = (message: string, status: number) => {
  return NextResponse.json({ error: message }, { status });
};

// Helper to sanitize and validate numeric parameters
const parseNumericParam = (value: string | null, defaultValue: number, min: number, max: number): number => {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) return defaultValue;
  return Math.min(Math.max(parsed, min), max);
};

// Helper to validate string parameters against allowed values
const validateEnumParam = <T extends string>(value: string | null, allowedValues: T[]): T | null => {
  if (!value) return null;
  return allowedValues.includes(value as T) ? (value as T) : null;
};

// Define interfaces for typed responses
interface NFTOwner {
  _id: string;
  name: string;
  image?: string;
}

interface NFTDocument {
  _id: string;
  name: string;
  image: string;
  game: string;
  rarity: string;
  price: number;
  owner: NFTOwner;
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // Get query parameters for filtering and pagination
    const searchParams = req.nextUrl.searchParams;
    
    // Query parameters
    const game = searchParams.get('game');
    const rarity = validateEnumParam(
      searchParams.get('rarity'),
      ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary']
    );
    
    // Price range
    const minPrice = parseNumericParam(searchParams.get('minPrice'), 0, 0, Number.MAX_SAFE_INTEGER);
    const maxPrice = parseNumericParam(searchParams.get('maxPrice'), Number.MAX_SAFE_INTEGER, 0, Number.MAX_SAFE_INTEGER);
    
    // Sort and pagination
    const validSortFields = ['price', 'name', 'rarity', 'createdAt'];
    const sortBy = validateEnumParam(searchParams.get('sortBy'), validSortFields) || 'price';
    const sortOrder = validateEnumParam(searchParams.get('sortOrder'), ['asc', 'desc']) || 'asc';
    
    // Limit the maximum number of items per page to prevent abuse
    const limit = parseNumericParam(searchParams.get('limit'), 20, 1, MAX_LIMIT); 
    const page = parseNumericParam(searchParams.get('page'), 1, 1, 100);
    const skip = (page - 1) * limit;
    
    // Build query object with type safety
    const query: Record<string, any> = { forSale: true };
    if (game) query.game = game;
    if (rarity) query.rarity = rarity;
    
    // Add price range query
    if (minPrice > 0 || maxPrice < Number.MAX_SAFE_INTEGER) {
      query.price = {};
      if (minPrice > 0) query.price.$gte = minPrice;
      if (maxPrice < Number.MAX_SAFE_INTEGER) query.price.$lte = maxPrice;
    }
    
    // Build sort object
    const sort: Record<string, 1 | -1> = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute queries in parallel for better performance
    const [nfts, total, stats] = await Promise.all([
      // Fetch NFTs for sale with pagination
      NFT.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('owner', 'name image')
        .lean(),
      
      // Get total count for pagination
      NFT.countDocuments(query),
      
      // Get marketplace stats (with Promise.all for parallel execution)
      Promise.all([
        // Total NFTs for sale
        NFT.countDocuments({ forSale: true }),
        
        // Price ranges
        NFT.aggregate([
          { $match: { forSale: true } },
          { $group: { 
            _id: null, 
            minPrice: { $min: "$price" },
            maxPrice: { $max: "$price" },
            avgPrice: { $avg: "$price" }
          }}
        ]),
        
        // Count by game
        NFT.aggregate([
          { $match: { forSale: true } },
          { $group: { _id: "$game", count: { $sum: 1 } } }
        ]),
        
        // Count by rarity
        NFT.aggregate([
          { $match: { forSale: true } },
          { $group: { _id: "$rarity", count: { $sum: 1 } } }
        ])
      ])
    ]);
    
    // Format the NFTs for response with proper type safety
    const formattedNFTs = nfts.map((nft: any) => {
      // Safely extract owner information
      let seller = { 
        id: '',
        name: 'Unknown Seller', 
        image: '/placeholder-user.jpg'
      };
      
      // Check if owner exists and has the expected structure
      if (nft.owner && typeof nft.owner === 'object') {
        seller = {
          id: nft.owner._id ? nft.owner._id.toString() : '',
          name: nft.owner.name || 'Unknown Seller',
          image: nft.owner.image || '/placeholder-user.jpg'
        };
      }
      
      return {
        id: nft._id.toString(),
        name: nft.name || 'Unnamed NFT',
        image: nft.image || '',
        game: nft.game || 'Unknown Game',
        rarity: nft.rarity || 'Common',
        price: nft.price || 0,
        seller
      };
    });
    
    // Build marketplace stats
    const priceStats = stats[1][0] || { minPrice: 0, maxPrice: 0, avgPrice: 0 };
    
    // Safely build distributions
    const gameDistribution = stats[2].reduce<Record<string, number>>((acc, curr) => {
      if (curr._id) {
        acc[curr._id] = curr.count;
      }
      return acc;
    }, {});
    
    const rarityDistribution = stats[3].reduce<Record<string, number>>((acc, curr) => {
      if (curr._id) {
        acc[curr._id] = curr.count;
      }
      return acc;
    }, {});
    
    // Include pagination metadata
    const pagination = {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    };
    
    return NextResponse.json({
      nfts: formattedNFTs,
      pagination,
      stats: {
        totalListings: stats[0],
        priceRange: {
          min: priceStats.minPrice || 0,
          max: priceStats.maxPrice || 0,
          avg: Math.round((priceStats.avgPrice || 0) * 100) / 100 // Round to 2 decimal places
        },
        gameDistribution,
        rarityDistribution
      }
    });
  } catch (error) {
    console.error("Error fetching marketplace data:", error);
    return errorResponse("Failed to fetch marketplace data", 500);
  }
}
