import { Request, Response } from "express";
import { Listing } from "../../models/listings";
import { User } from "../../models/user";
import { Booking } from "../../models/booking";


export const addEntity = async (req: Request, res: Response): Promise<void> => {
    const { vendorId, type, name, address, description, facilities, pricing, images } = req.body;

    if (!vendorId || !type || !name || !address || !description || !facilities || !pricing || !images) {
        res.status(401).json({ message: "Fields are incomplete" });
        return;
    }

    try {
        const vendor = await User.findOne({ _id: vendorId, role: "vendor" });
        if (!vendor) {
            res.status(404).json({ message: "Vendor not found" });
            return;
        }

        const listing = await Listing.findOne({ vendorId, address, name });
        if (listing) {
            res.status(409).json({ message: "Similar place exists" });
            return;
        }

        const LISTING = new Listing({
            vendorId,
            type,
            name,
            address,
            description,
            facilities,
            pricing,
            images
        });

        await LISTING.save();
        res.status(200).json({ message: "Successfully added", data: LISTING });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getBookings = async (req: Request, res: Response): Promise<void> => {
    const  listingId  = req.params.listingId;  

    if (!listingId) {
        res.status(404).json({ message: "Incomplete fields (actual error)" });
        return;
    }

    try {
        const bookings = await Booking.find({ listingId });

        if (bookings.length === 0) {
            res.status(404).json({ message: "No bookings found" });
            return;
        }

        res.status(200).json({ message: "Bookings found", data: bookings });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

