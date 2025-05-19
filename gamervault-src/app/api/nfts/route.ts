import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import NFT from "@/models/NFT";
import { getUserIdFromRequest } from "@/lib/auth";

// Helper for consistent error responses
const errorResponse = (message: string, status: number) => {
  return NextResponse.json({ error: message }, { status });
};

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) {
      return errorResponse("Authentication required", 401);
    }

    await dbConnect();

    // Get query parameters
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;
    const category = searchParams.get("category");
    const rarity = searchParams.get("rarity");
    const game = searchParams.get("game");
    const sortBy = searchParams.get("sortBy") || "acquiredDate";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;
    
    // Build query
    const query: any = {};
    
    // Filter by category
    if (category && category !== "all") {
      query.category = category;
    }
    
    // Filter by rarity
    if (rarity && rarity !== "all") {
      query.rarity = rarity;
    }
    
    // Filter by game
    if (game && game !== "all") {
      query.game = game;
    }
    
    // Build sort object
    const sort: Record<string, 1 | -1> = {};
    sort[sortBy] = sortOrder;

    // Execute queries in parallel
    const [ownedNFTs, marketplaceNFTs, total] = await Promise.all([
      // Fetch NFTs owned by the user
      NFT.find({ owner: userId })
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      
      // Fetch NFTs available in marketplace
      NFT.find({ forSale: true })
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('owner', 'name image')
        .lean(),
      
      // Get total count for pagination
      NFT.countDocuments({ $or: [{ owner: userId }, { forSale: true }] })
    ]);
    
    // Format NFTs for response
    const formattedOwnedNFTs = ownedNFTs.map((nft: any) => ({
      id: nft._id.toString(),
      name: nft.name || 'Unnamed NFT',
      image: nft.image || '',
      game: nft.game || 'Unknown Game',
      rarity: nft.rarity || 'Common',
      category: nft.category || 'Other',
      acquired: nft.acquiredDate?.toISOString().split('T')[0] || '',
      forSale: false
    }));
    
    const formattedMarketplaceNFTs = marketplaceNFTs.map((nft: any) => {
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
        category: nft.category || 'Other',
        price: nft.price || 0,
        seller,
        forSale: true
      };
    });
    
    // Combine both types of NFTs
    const allNFTs = [...formattedOwnedNFTs, ...formattedMarketplaceNFTs];
    
    // Get statistics
    const stats = {
      totalOwned: formattedOwnedNFTs.length,
      totalMarketplace: formattedMarketplaceNFTs.length,
      categories: {
        weapon: allNFTs.filter(nft => nft.category?.toLowerCase() === 'weapon').length,
        armor: allNFTs.filter(nft => nft.category?.toLowerCase() === 'armor').length,
        mount: allNFTs.filter(nft => nft.category?.toLowerCase() === 'mount').length,
        collectible: allNFTs.filter(nft => nft.category?.toLowerCase() === 'collectible').length,
        other: allNFTs.filter(nft => nft.category?.toLowerCase() === 'other').length,
      },
      rarities: {
        common: allNFTs.filter(nft => nft.rarity?.toLowerCase() === 'common').length,
        uncommon: allNFTs.filter(nft => nft.rarity?.toLowerCase() === 'uncommon').length,
        rare: allNFTs.filter(nft => nft.rarity?.toLowerCase() === 'rare').length,
        epic: allNFTs.filter(nft => nft.rarity?.toLowerCase() === 'epic').length,
        legendary: allNFTs.filter(nft => nft.rarity?.toLowerCase() === 'legendary').length,
        mythic: allNFTs.filter(nft => nft.rarity?.toLowerCase() === 'mythic').length,
      }
    };
    
    // Include pagination metadata
    const pagination = {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    };
    
    return NextResponse.json({
      owned: formattedOwnedNFTs,
      marketplace: formattedMarketplaceNFTs,
      all: allNFTs,
      pagination,
      stats
    });
  } catch (error) {
    console.error("Error fetching NFTs data:", error);
    return errorResponse("Failed to fetch NFTs data", 500);
  }
}
