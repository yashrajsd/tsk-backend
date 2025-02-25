import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader =  req.headers.authorization;
        console.log(authHeader)
        if (!authHeader ) {
            res.status(401).json({ message: "No token: Authorization denied (error is actually here)" });
            return;
        }

        const token = authHeader.replace("Bearer", "").trim();
        console.log(token)
        if (!token) {
            res.status(401).json({ message: "No token: Authorization denied (error is here)" });
            return;
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            res.status(500).json({ message: "Server error: JWT secret missing" });
            return;
        }

        const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
        if (!decoded) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }

        req.body.user = decoded;

        console.log("Authenticated user:", req.body.user);
        next(); 

    } catch (err) {
        console.error("JWT Verification Error:", err);
        res.status(401).json({ message: "Invalid token" });
    }
};
