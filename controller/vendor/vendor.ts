import { Request, Response } from "express";
import { Listing } from "../../models/listings";
import { User } from "../../models/user";
import { Booking } from "../../models/booking";

export const addEntity=async(req:Request,res:Response):Promise<void>=>{
    const {vendorId,type,name,address,description,facilities,pricing,images} = req.body;
    if(!vendorId || !type || !name || !address || !description || !facilities || !pricing || !images){
        res.json({message:"Fields are incomplete"}).status(401);
        return;
    }
    try{
        const vendor = await User.findOne({_id:vendorId,role:"vendor"});
        if(!vendor){
            res.json({message:"Vendor not found"}).status(404);
            return;
        }
        const listing = await Listing.findOne({vendorId,address,name})
        if(listing){
            res.json({message:"Similar place exists"}).status(409);
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
        })
        await LISTING.save();
        res.json({message:"Successfully added",data:LISTING}).status(200);
        return;
    }catch(err){
        res.json({message:"Internal server error"}).status(500);
        return
    }
}

export const getBookings=async(req:Request,res:Response):Promise<void>=>{
    const {listingId} = req.body;
    if(!listingId){
        res.json({message:"Incomplete fields"}).status(404);
        return;
    }
    try{
        const bookings = await Booking.find({listingId:listingId});
        if(bookings.length<0){
            res.json({message:"No bookings found"}).status(404);
        }
        res.json({message:"Bookings found",data:bookings}).status(200);
        return;
    }catch(err){
        res.json({message:"Internal server error"}).status(500);
        return
    }
}