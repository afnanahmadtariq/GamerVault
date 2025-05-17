import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import NFT, { NFTDocument } from "@/models/NFT";
import Activity from "@/models/Activity";
import { getUserIdFromRequest } from "@/lib/auth";
import mongoose, { Document } from "mongoose";
import User from "@/models/User";

// Define owner interface for populated fields
interface UserPopulated extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
}

// Error response helper function
const errorResponse = (message: string, status: number) => {
  return NextResponse.json({ error: message }, { status });
};

export async function POST(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    // Validate user authentication
    const userId = await getUserIdFromRequest(req);
    if (!userId) {
      return errorResponse("Authentication required", 401);
    }

    // Connect to database
    await dbConnect();
    
    // Find the NFT for sale
    const nft = await NFT.findOne({ 
      _id: params.id,
      forSale: true
    }).populate<{ owner: UserPopulated }>('owner');
    
    if (!nft) {
      return errorResponse("NFT not found or not available for sale", 404);
    }
    
    // Check if the user is trying to buy their own NFT
    if (nft.owner._id.toString() === userId) {
      return errorResponse("You cannot buy your own NFT", 400);
    }
    
    // Start a transaction session
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Store previous owner information before updating
      const previousOwnerName = nft.owner.name;
      const previousOwnerId = nft.owner._id;
      
      // Update NFT owner and set not for sale
      nft.previousOwners = nft.previousOwners || [];
      nft.previousOwners.push(previousOwnerId as unknown as mongoose.Schema.Types.ObjectId);
      
      // Handle type correctly during assignment
      const ownerObjectId = new mongoose.Types.ObjectId(userId);
      // @ts-ignore - We know this will work at runtime even if TypeScript is complaining
      nft.owner = ownerObjectId;
      
      nft.forSale = false;
      nft.acquiredDate = new Date();
      
      await nft.save({ session });
      
      // Common metadata for activities
      const commonMetadata = {
        price: nft.price,
        nftId: nft.id,
        nftName: nft.name,
        nftImage: nft.image
      };
      
      // Create activity for buyer
      await Activity.create([{
        userId: new mongoose.Types.ObjectId(userId),
        type: 'purchase' as const,
        title: 'NFT Purchased',
        description: `You purchased ${nft.name} from ${previousOwnerName}`,
        relatedId: nft.id,
        timestamp: new Date(),
        metadata: {
          ...commonMetadata,
          seller: previousOwnerName,
          sellerId: previousOwnerId.toString()
        }
      }], { session });
      
      // Create activity for seller
      await Activity.create([{
        userId: previousOwnerId,
        type: 'purchase' as const,
        title: 'NFT Sold',
        description: `Your ${nft.name} was purchased`,
        relatedId: nft.id,
        timestamp: new Date(),
        metadata: {
          ...commonMetadata,
          buyerId: userId
        }
      }], { session });
      
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
    
    return NextResponse.json({ 
      success: true,
      message: "NFT purchased successfully",
      nft: {
        id: nft.id,
        name: nft.name
      }
    });
  } catch (error) {
    console.error("Error purchasing NFT:", error);
    return errorResponse("Internal Server Error", 500);
  }
}
