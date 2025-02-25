import mongoose, { Schema } from "mongoose";
import { IBooking } from "../lib/interface/models";

const BookingSchema = new Schema<IBooking>({
    _id: { type: String, required: true },
    customerId: { type: String, ref: 'User', required: true },
    listingId: { type: String, ref: 'Listing', required: true },
    unitId: { type: String, ref: 'Unit', required: true },
    bookingDates: { type: [Date], required: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], required: true },
    paymentDetails: { type: String, required: true },
  });
  
export  const Booking = mongoose.model<IBooking>('Booking', BookingSchema);