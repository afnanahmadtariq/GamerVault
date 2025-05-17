import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import NFT from "@/models/NFT";
import Activity from "@/models/Activity";
import UserProfile from "@/models/UserProfile";
import { getUserIdFromRequest } from "@/lib/auth";
import mongoose from "mongoose";

export async function POST(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    await dbConnect();
    
    // Find the NFT for sale
    const nft = await NFT.findOne({ 
      _id: params.id,
      forSale: true
    }).populate('owner', 'name');
    
    if (!nft) {
      return NextResponse.json({ error: "NFT not found or not available for sale" }, { status: 404 });
    }
    
    // Check if the user is trying to buy their own NFT
    if (nft.owner._id.toString() === userId) {
      return NextResponse.json({ error: "You cannot buy your own NFT" }, { status: 400 });
    }
    
    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Get buyer profile to check balance - in a real app
      // We would need to implement a wallet/balance system
      // For now, we'll assume the purchase is successful
      
      // Update NFT owner and set not for sale
      const previousOwner = nft.owner;
      nft.previousOwners = nft.previousOwners || [];
      nft.previousOwners.push(nft.owner._id);
      nft.owner = new mongoose.Types.ObjectId(userId);
      nft.forSale = false;
      nft.acquiredDate = new Date();
      
      await nft.save({ session });
      
      // Create activity for buyer
      await Activity.create([{
        userId: userId,
        type: 'purchase',
        title: 'NFT Purchased',
        description: `You purchased ${nft.name} from ${previousOwner.name}`,
        relatedId: nft._id.toString(),
        timestamp: new Date(),
        metadata: {
          price: nft.price,
          seller: previousOwner.name,
          sellerId: previousOwner._id.toString(),
          nftId: nft._id.toString(),
          nftName: nft.name,
          nftImage: nft.image
        }
      }], { session });
      
      // Create activity for seller
      await Activity.create([{
        userId: previousOwner._id.toString(),
        type: 'purchase',
        title: 'NFT Sold',
        description: `Your ${nft.name} was purchased`,
        relatedId: nft._id.toString(),
        timestamp: new Date(),
        metadata: {
          price: nft.price,
          buyerId: userId,
          nftId: nft._id.toString(),
          nftName: nft.name,
          nftImage: nft.image
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
        id: nft._id.toString(),
        name: nft.name
      }
    });
  } catch (error) {
    console.error("Error purchasing NFT:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
