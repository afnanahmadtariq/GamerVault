import mongoose, { Document, Model, Schema } from "mongoose";

export interface NFTDocument extends Document {
  name: string;
  image: string;
  game: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  category: 'Weapon' | 'Armor' | 'Mount' | 'Collectible' | 'Other';
  acquiredDate: Date;
  owner: mongoose.Schema.Types.ObjectId;
  description?: string;
  attributes?: Record<string, any>;
  value?: number;
  previousOwners?: mongoose.Schema.Types.ObjectId[];
  forSale?: boolean;
  price?: number;
}

const NFTSchema = new Schema<NFTDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"]
    },
    image: {
      type: String,
      required: [true, "Image URL is required"]
    },
    game: {
      type: String,
      required: [true, "Game is required"],
      trim: true
    },
    rarity: {
      type: String,
      required: [true, "Rarity is required"],
      enum: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary']
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ['Weapon', 'Armor', 'Mount', 'Collectible', 'Other']
    },
    acquiredDate: {
      type: Date,
      default: Date.now
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    description: {
      type: String,
      trim: true
    },
    attributes: {
      type: Object
    },
    value: {
      type: Number
    },
    previousOwners: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    forSale: {
      type: Boolean,
      default: false
    },
    price: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

// Indexes for common queries
NFTSchema.index({ owner: 1, rarity: 1 });
NFTSchema.index({ game: 1, rarity: 1 });
NFTSchema.index({ forSale: 1 });

const NFT: Model<NFTDocument> = mongoose.models.NFT || mongoose.model<NFTDocument>("NFT", NFTSchema);

export default NFT;
