"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, GamepadIcon, ShoppingBag, Trophy, User, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Activity {
  id: string;
  type: "achievement" | "game" | "purchase" | "friend";
  title: string;
  description: string;
  time: string;
  metadata?: Record<string, any>;
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/activities");
        
        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }
        
        const data = await response.json();
        setActivities(data.activities);
      } catch (error) {
        console.error("Error fetching activities:", error);
        toast({
          title: "Error",
          description: "Failed to load recent activities",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [toast]);

  // Generate icon based on activity type
  const getActivityIcon = (activity: Activity) => {
    switch (activity.type) {
      case "achievement":
        return <Trophy className="h-5 w-5 text-primary" />;
      case "game":
        return <GamepadIcon className="h-5 w-5 text-primary" />;
      case "purchase":
        return <ShoppingBag className="h-5 w-5 text-primary" />;
      case "friend":
        // If we have user image in metadata, use it
        if (activity.metadata?.userImage) {
          return (
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.metadata.userImage} alt={activity.metadata.userName || "User"} />
              <AvatarFallback>{activity.metadata.userInitials || "U"}</AvatarFallback>
            </Avatar>
          );
        }
        return <User className="h-5 w-5 text-primary" />;
      default:
        return <Trophy className="h-5 w-5 text-primary" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (activities.length === 0) {
    return <div className="text-center p-6 text-muted-foreground">No recent activities</div>;
  }
    },
    {
      id: 5,
      type: "achievement",
      title: "Master Wizard Achievement",
      description: "You cast 1000 spells successfully in Wizard Wars",
      time: "2 weeks ago",
      icon: <Award className="h-5 w-5 text-primary" />,
    },
  ]

  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">{activity.icon}</div>
          <div className="space-y-1">
            <p className="text-sm font-medium">{activity.title}</p>
            <p className="text-xs text-muted-foreground">{activity.description}</p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
