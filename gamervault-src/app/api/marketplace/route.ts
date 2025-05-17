import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import NFT from "@/models/NFT";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // Get query parameters for filtering and pagination
    const searchParams = req.nextUrl.searchParams;
    const game = searchParams.get('game');
    const rarity = searchParams.get('rarity');
    const minPrice = Number(searchParams.get('minPrice')) || undefined;
    const maxPrice = Number(searchParams.get('maxPrice')) || undefined;
    const sortBy = searchParams.get('sortBy') || 'price';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    const limit = Number(searchParams.get('limit')) || 20;
    const page = Number(searchParams.get('page')) || 1;
    const skip = (page - 1) * limit;
    
    // Build query object
    const query: any = { forSale: true };
    if (game) query.game = game;
    if (rarity) query.rarity = rarity;
    if (minPrice !== undefined) query.price = { $gte: minPrice };
    if (maxPrice !== undefined) {
      if (query.price) {
        query.price.$lte = maxPrice;
      } else {
        query.price = { $lte: maxPrice };
      }
    }
    
    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    // Fetch NFTs for sale
    const nfts = await NFT.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('owner', 'name image')
      .lean();
    
    const total = await NFT.countDocuments(query);
    
    // Format the NFTs for response
    const formattedNFTs = nfts.map(nft => ({
      id: nft._id.toString(),
      name: nft.name,
      image: nft.image,
      game: nft.game,
      rarity: nft.rarity,
      price: nft.price,
      seller: nft.owner ? {
        id: nft.owner._id.toString(),
        name: nft.owner.name,
        image: nft.owner.image
      } : { name: 'Unknown Seller' }
    }));
    
    // Get marketplace stats
    const stats = await Promise.all([
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
    ]);
    
    // Build marketplace stats
    const priceStats = stats[1][0] || { minPrice: 0, maxPrice: 0, avgPrice: 0 };
    const gameDistribution = stats[2].reduce((acc: Record<string, number>, curr: any) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});
    const rarityDistribution = stats[3].reduce((acc: Record<string, number>, curr: any) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    return NextResponse.json({ 
      nfts: formattedNFTs,
      stats: {
        totalListings: stats[0],
        priceStats: {
          min: priceStats.minPrice,
          max: priceStats.maxPrice,
          avg: priceStats.avgPrice
        },
        gameDistribution,
        rarityDistribution
      },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching marketplace listings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
