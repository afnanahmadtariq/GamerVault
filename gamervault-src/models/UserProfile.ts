import mongoose, { Document, Model, Schema } from "mongoose";

export interface UserProfileDocument extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  level: number;
  experience: number;
  totalAchievements: number;
  bio?: string;
  favoriteGames?: string[];
  friends?: mongoose.Schema.Types.ObjectId[];
  friendRequests?: mongoose.Schema.Types.ObjectId[];
  status?: 'online' | 'offline' | 'away' | 'busy';
  socialLinks?: {
    twitter?: string;
    discord?: string;
    twitch?: string;
    youtube?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema = new Schema<UserProfileDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    level: {
      type: Number,
      default: 1
    },
    experience: {
      type: Number,
      default: 0
    },
    totalAchievements: {
      type: Number,
      default: 0
    },
    bio: {
      type: String,
      maxlength: [500, "Bio cannot be more than 500 characters"]
    },
    favoriteGames: [{
      type: String
    }],
    friends: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    friendRequests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    status: {
      type: String,
      enum: ['online', 'offline', 'away', 'busy'],
      default: 'offline'
    },
    socialLinks: {
      twitter: String,
      discord: String,
      twitch: String,
      youtube: String
    }
  },
  {
    timestamps: true
  }
);

// Helper method to calculate XP needed for next level
UserProfileSchema.methods.getXpForNextLevel = function(): number {
  // Example XP formula: 100 * level^1.5
  return Math.floor(100 * Math.pow(this.level, 1.5));
};

// Helper method to calculate progress percentage to next level
UserProfileSchema.methods.getLevelProgress = function(): number {
  const xpForNextLevel = this.getXpForNextLevel();
  const xpForCurrentLevel = Math.floor(100 * Math.pow(this.level - 1, 1.5));
  const levelXp = this.experience - xpForCurrentLevel;
  const levelRange = xpForNextLevel - xpForCurrentLevel;
  return Math.floor((levelXp / levelRange) * 100);
};

const UserProfile: Model<UserProfileDocument> = 
  mongoose.models.UserProfile || 
  mongoose.model<UserProfileDocument>("UserProfile", UserProfileSchema);

export default UserProfile;
