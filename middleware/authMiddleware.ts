import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { USER } from "../lib/interface/models";
import { User } from "../models/user";


const ROLES = {
    VENDOR: "Vendor",
    USER: "User",
    ADMIN: "Admin",
};

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        console.log("Body data");
        console.log(req.body)
        if (!authHeader) {
            res.status(401).json({ message: "No token: Authorization denied" });
            return;
        }

        const token = authHeader.replace("Bearer", "").trim();

        if (!token) {
            res.status(401).json({ message: "No token: Authorization denied" });
            return;
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            res.status(500).json({ message: "Server error: JWT secret missing" });
            return;
        }

        const decoded = jwt.verify(token, secret) as USER; 
        req.user = decoded; 

        console.log("Authenticated user:", req.user);
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err);
        res.status(401).json({ message: "Invalid token" });
    }
};

export const verifyVendor = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized: No user found" });
        return;
    }

    const { id, role } = req.user; 

    if (!id) {
        res.status(422).json({ message: "Missing ID value" });
        return;
    }

    try {
        const user = await User.findOne({ _id: id });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        if (role == "User") {
            res.status(403).json({ message: "Unauthorized access attempt" });
            return;
        }

        next();
    } catch (err) {
        console.error("JWT Verification Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
