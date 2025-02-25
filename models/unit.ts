import mongoose, { Schema } from "mongoose";
import { IUnit } from "../lib/interface/models";

const UnitSchema = new Schema<IUnit>({
    _id: { type: String, required: true },
    listingId: { type: String, ref: 'Listing', required: true },
    type: { type: String, required: true },
    capacity: { type: Number, required: true },
    price: { type: Number, required: true },
    availability: { type: Boolean, required: true },
});

export const Unit = mongoose.model<IUnit>('Unit', UnitSchema);