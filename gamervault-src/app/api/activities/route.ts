import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Activity from "@/models/Activity";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    await dbConnect();
    
    const searchParams = req.nextUrl.searchParams;
    const limit = Number(searchParams.get('limit')) || 10;
    const type = searchParams.get('type');
    
    // Build query
    const query: any = { userId };
    if (type) query.type = type;
    
    // Get recent activities
    const activities = await Activity.find(query)
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean();
    
    // Format dates to relative time
    const formattedActivities = activities.map(activity => {
      const now = new Date();
      const timestamp = new Date(activity.timestamp);
      const diffMs = now.getTime() - timestamp.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      
      let timeAgo;
      if (diffDays > 7) {
        timeAgo = `${timestamp.toLocaleDateString()}`;
      } else if (diffDays > 0) {
        timeAgo = `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
      } else if (diffHours > 0) {
        timeAgo = `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
      } else {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        timeAgo = diffMinutes > 0 
          ? `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`
          : 'Just now';
      }
      
      return {
        ...activity,
        id: activity._id.toString(),
        time: timeAgo
      };
    });

    return NextResponse.json({ activities: formattedActivities });
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
