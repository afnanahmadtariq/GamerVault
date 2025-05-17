import mongoose, { Document, Model, Schema } from "mongoose";

export interface AchievementDocument extends Document {
  name: string;
  game: string;
  description: string;
  points: number;
  image?: string;
  rarity?: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  unlockedBy: mongoose.Schema.Types.ObjectId[];
  unlockCriteria?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AchievementSchema = new Schema<AchievementDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    game: {
      type: String,
      required: [true, "Game name is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true
    },
    points: {
      type: Number,
      required: [true, "Points value is required"],
      min: [0, "Points must be a positive number"]
    },
    image: {
      type: String
    },
    rarity: {
      type: String,
      enum: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary']
    },
    unlockedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    unlockCriteria: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Indexes for common searches
AchievementSchema.index({ game: 1 });
AchievementSchema.index({ rarity: 1 });

const Achievement: Model<AchievementDocument> = mongoose.models.Achievement || mongoose.model<AchievementDocument>("Achievement", AchievementSchema);

export default Achievement;
