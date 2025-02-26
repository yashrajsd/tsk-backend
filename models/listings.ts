import mongoose, { Schema } from "mongoose";
import { IListing } from "../lib/interface/models";

const ListingSchema = new Schema<IListing>({
    vendorId: { type: String, ref: 'User', required: true },
    type: { type: String, enum: ['Hotel', 'Restaurant'], required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    facilities: { type: [String], required: true },
    pricing: { type: Number, required: true },
    images: { type: [String], required: true },
  });
  
export  const Listing = mongoose.model<IListing>('Listing', ListingSchema);