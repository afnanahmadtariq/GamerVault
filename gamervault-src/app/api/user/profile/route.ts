import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import UserProfile from "@/models/UserProfile";
import User from "@/models/User";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    await dbConnect();

    // Get user profile - create if it doesn't exist
    let userProfile = await UserProfile.findOne({ userId });
    
    if (!userProfile) {
      // Create new profile if one doesn't exist
      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      userProfile = await UserProfile.create({
        userId,
        level: 1,
        experience: 0,
        totalAchievements: 0
      });
    }

    // Calculate level progress
    const xpForNextLevel = Math.floor(100 * Math.pow(userProfile.level, 1.5));
    const xpForCurrentLevel = Math.floor(100 * Math.pow(userProfile.level - 1, 1.5));
    const levelXp = userProfile.experience - xpForCurrentLevel;
    const levelRange = xpForNextLevel - xpForCurrentLevel;
    const levelProgress = Math.floor((levelXp / levelRange) * 100);

    return NextResponse.json({ 
      profile: {
        ...userProfile.toObject(),
        levelProgress,
        xpForNextLevel
      }
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
