import { Document } from 'mongoose'

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: 'Customer' | 'Vendor' | 'Admin';
    contactDetails: string;
}

export interface IListing extends Document {
    _id: string; 
    vendorId: string;
    type: 'Hotel' | 'Restaurant';
    name: string;
    address: string;
    description: string;
    facilities: string[];
    pricing: number;
    images: string[];
}

export interface IUnit extends Document {
    listingId: string;
    type: string;
    capacity: number;
    price: number;
    availability: boolean;
}

export interface IBooking extends Document {
    _id: string; 
    customerId: string;
    listingId: string;
    unitId: string;
    bookingDates: Date[];
    status: 'Pending' | 'Confirmed' | 'Cancelled';
    paymentDetails: string;
}
  
export interface IReview extends Document {
    _id: string; 
    bookingId: string;
    customerId: string;
    rating: number;
    comments: string;
    timestamp: Date;
  }