import express from 'express';
import { addEntity, getBookings } from '../controller/vendor/vendor';
import { verifyToken, verifyVendor } from '../middleware/authMiddleware';

export const vendorRouter = express.Router();

vendorRouter.post("/vendor/add", verifyToken, verifyVendor, addEntity);
vendorRouter.get("/vendor/bookings/:listingId", verifyToken, verifyVendor, getBookings);
