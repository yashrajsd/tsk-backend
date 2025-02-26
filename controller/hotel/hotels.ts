import { Request, Response } from "express";
import { Booking } from "../../models/booking";
import { Listing } from "../../models/listings";
import { Unit } from "../../models/unit";

export const getSearch = async (req: Request, res: Response): Promise<void> => {

    try {
        res.json({ message: "Working", status: 200 });
        return;
    } catch (err) {
        res.json({ message: "Internal server error", status: 500 });
        return;
    }
};

export const getRoomOrTable = async (req: Request, res: Response): Promise<void> => {
    const { unitId } = req.body;
    if (!unitId) {
        res.json({ message: "ID is required" }).status(400);
        return;
    }
    try {
        const unit = await Unit.findOne({ _id: unitId });
        if (!unit) {
            res.json({ message: "Data not found X" }).status(404);
            return;
        }
        res.json({ message: "Data successfull", data:unit}).status(200);
    } catch (err) {
        res.json({ message: "Internal server error!! ", status: 500 })
    }
}

export const bookPlace = async (req: Request, res: Response): Promise<void> => {
    const { listingId, customerId, bookingDates, status, paymentDetails } = req.body;
    try {
        const listing = await Listing.findOne({ _id: listingId });
        if (!listing) {
            res.json({ message: "Dosen't exist" }).status(404);
            return;
        }
        const unit = await Unit.findOne({ availability: true, listingId: listingId })
        if (!unit) {
            res.json({ message: "Reservation full" }).status(501);
            return;
        }
        const booking = new Booking({
            customerId,
            listingId,
            unitId: unit._id,
            bookingDates,
            status,
            paymentDetails
        })
        await booking.save();
        res.json({ message: "Working", status: 200 });
        return;
    } catch (err) {
        res.json({ message: "Internal server error!! ", status: 500 })
        return;
    }
}

export const getHistory = async (req: Request, res: Response): Promise<void> => {
    const { customerId } = await req.body;
    if (!customerId) {
        res.json({ message: "Incomplete field" }).status(400);
        return;
    }
    try {
        const Bookings = await Booking.find({ customerId });
        if (Bookings.length < 0) {
            console.log("Aai zhavune takel");
            res.json({ message: "No history found" }).status(404);
            return;
        }
        res.json({ message: "Working", data: Bookings }).status(200);
        return;
    } catch (err) {
        res.json({ message: "Internal server error!! ", status: 500 })
        return;
    }
}