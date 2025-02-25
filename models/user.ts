import mongoose, { Schema} from 'mongoose';
import { IUser } from '../lib/interface/models';



const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Customer', 'Vendor', 'Admin'], required: true },
  contactDetails: { type: String, required: true },
});

export const User = mongoose.model("User",UserSchema);