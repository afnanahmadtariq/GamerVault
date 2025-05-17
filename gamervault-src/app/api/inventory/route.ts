import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import NFT from "@/models/NFT";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    await dbConnect();
    
    // Get query parameters for filtering and sorting
    const searchParams = req.nextUrl.searchParams;
    const game = searchParams.get('game');
    const rarity = searchParams.get('rarity');
    const category = searchParams.get('category');
    const sortBy = searchParams.get('sortBy') || 'acquiredDate';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const limit = Number(searchParams.get('limit')) || 20;
    const page = Number(searchParams.get('page')) || 1;
    const skip = (page - 1) * limit;
    
    // Build query object
    const query: any = { owner: userId };
    if (game) query.game = game;
    if (rarity) query.rarity = rarity;
    if (category) query.category = category;

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    // Fetch user's NFTs
    const nfts = await NFT.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await NFT.countDocuments(query);
    
    // Get collection stats
    const stats = await Promise.all([
      // Total NFTs
      NFT.countDocuments({ owner: userId }),
      
      // Total value
      NFT.aggregate([
        { $match: { owner: userId } },
        { $group: { _id: null, totalValue: { $sum: "$value" } } }
      ]),
      
      // Count by rarity
      NFT.aggregate([
        { $match: { owner: userId } },
        { $group: { _id: "$rarity", count: { $sum: 1 } } }
      ]),
      
      // Count by game
      NFT.aggregate([
        { $match: { owner: userId } },
        { $group: { _id: "$game", count: { $sum: 1 } } }
      ])
    ]);
    
    // Format the NFTs for response
    const formattedNFTs = nfts.map(nft => ({
      ...nft,
      id: nft._id.toString(),
      acquired: nft.acquiredDate.toISOString().split('T')[0]
    }));
    
    // Build collection stats
    const totalValue = stats[1][0]?.totalValue || 0;
    const rarityStats = Object.fromEntries(stats[2].map(item => [item._id, item.count]));
    const gameStats = stats[3];
    
    // Find rarest item
    const rarestItem = rarityStats['Legendary'] ? 'Legendary' : 
                        rarityStats['Epic'] ? 'Epic' :
                        rarityStats['Rare'] ? 'Rare' : 'Common';

    return NextResponse.json({ 
      nfts: formattedNFTs,
      stats: {
        totalCount: stats[0],
        totalValue,
        rarestItem,
        gameCount: gameStats.length,
        rarityDistribution: rarityStats
      },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
