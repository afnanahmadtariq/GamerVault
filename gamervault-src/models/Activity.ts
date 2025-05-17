import mongoose, { Document, Model, Schema } from "mongoose";

export interface ActivityDocument extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  type: 'achievement' | 'game' | 'purchase' | 'friend';
  title: string;
  description: string;
  timestamp: Date;
  icon?: string; // Store icon identifier or path
  relatedId?: string; // Can be achievementId, gameId, nftId, friendId, etc.
  metadata?: Record<string, any>; // For type-specific data
}

const ActivitySchema = new Schema<ActivityDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['achievement', 'game', 'purchase', 'friend']
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    icon: {
      type: String
    },
    relatedId: {
      type: String
    },
    metadata: {
      type: Object
    }
  },
  {
    timestamps: true
  }
);

// Create index for efficient querying by userId + timestamp
ActivitySchema.index({ userId: 1, timestamp: -1 });

const Activity: Model<ActivityDocument> = mongoose.models.Activity || mongoose.model<ActivityDocument>("Activity", ActivitySchema);

export default Activity;
