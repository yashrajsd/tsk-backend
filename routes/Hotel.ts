import express from 'express';
import {bookPlace, getHistory, getRoomOrTable, getSearch } from '../controller/hotel/hotels';
import { verifyToken } from '../middleware/authMiddleware';
// Anyone can access this routes
export  const HotelRouter = express.Router();
HotelRouter.get("/search/:query", verifyToken,getSearch);
HotelRouter.get("/entity/:id", verifyToken,getRoomOrTable)
HotelRouter.put("/book/:pid/:id", verifyToken,bookPlace)
HotelRouter.get("/history/:uid", verifyToken,getHistory)

