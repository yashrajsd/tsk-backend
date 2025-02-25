import mongoose, { Schema } from "mongoose";
import { IReview } from "../lib/interface/models";

const ReviewSchema = new Schema<IReview>({
    _id: { type: String, required: true },
    bookingId: { type: String, ref: 'Booking', required: true },
    customerId: { type: String, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comments: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export const Review = mongoose.model<IReview>('Review', ReviewSchema);