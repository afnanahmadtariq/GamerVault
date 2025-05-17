import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Achievement from "@/models/Achievement";
import UserAchievement from "@/models/UserAchievement";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // Optional: filter achievements by game
    const searchParams = req.nextUrl.searchParams;
    const game = searchParams.get('game');
    const limit = Number(searchParams.get('limit')) || 10;
    const page = Number(searchParams.get('page')) || 1;
    const skip = (page - 1) * limit;
    
    // Build query
    const query = game ? { game } : {};
    
    // Get user ID if authenticated
    const userId = await getUserIdFromRequest(req);
    
    // Get achievements with pagination
    const achievements = await Achievement.find(query)
      .sort({ points: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await Achievement.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    // If logged in, get user's unlocked achievements
    let userAchievements: string[] = [];
    if (userId) {
      const unlocked = await UserAchievement.find({ 
        userId, 
        achievementId: { $in: achievements.map(a => a._id) }
      }).select('achievementId');
      
      userAchievements = unlocked.map(ua => ua.achievementId.toString());
    }
    
    // Add unlocked status to each achievement
    const achievementsWithStatus = achievements.map(achievement => ({
      ...achievement,
      unlocked: userId ? userAchievements.includes(achievement._id.toString()) : false
    }));

    return NextResponse.json({ 
      achievements: achievementsWithStatus,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
