import mongoose, { Document, Model, Schema } from "mongoose";

export interface GameDocument extends Document {
  name: string;
  description: string;
  image?: string;
  releaseDate?: Date;
  publisher?: string;
  genre?: string[];
  achievementsCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const GameSchema = new Schema<GameDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      unique: true
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true
    },
    image: {
      type: String
    },
    releaseDate: {
      type: Date
    },
    publisher: {
      type: String,
      trim: true
    },
    genre: [{
      type: String,
      trim: true
    }],
    achievementsCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Text index for searching games
GameSchema.index({ name: 'text', description: 'text' });

const Game: Model<GameDocument> = mongoose.models.Game || mongoose.model<GameDocument>("Game", GameSchema);

export default Game;
