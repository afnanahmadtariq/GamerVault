import mongoose, { Document, Model, Schema } from "mongoose";

export interface UserAchievementDocument extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  achievementId: mongoose.Schema.Types.ObjectId;
  unlockedAt: Date;
}

const UserAchievementSchema = new Schema<UserAchievementDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    achievementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Achievement',
      required: true
    },
    unlockedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Unique compound index to prevent duplicate achievements
UserAchievementSchema.index({ userId: 1, achievementId: 1 }, { unique: true });

const UserAchievement: Model<UserAchievementDocument> = 
  mongoose.models.UserAchievement || 
  mongoose.model<UserAchievementDocument>("UserAchievement", UserAchievementSchema);

export default UserAchievement;
