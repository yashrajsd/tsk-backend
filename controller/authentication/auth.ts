import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { User } from "../../models/user";



export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.body);
        const { name, email, password, role, contactDetails } = req.body;

        if (!name || !email || !password || !role || !contactDetails) {
            res.status(400).json({ message: "All fields are required", status: 400 });
            return;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).json({ message: "Email already exists", status: 409 });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            contactDetails,
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully", status: 201 });

    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "All fields are required", status: 400 });
            return;
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found!" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const jwtsecret =process.env.JWT_SECRET || "";
        if(!jwtsecret)return;
        const token = jwt.sign(
            {id:user._id,role:user.role},
            jwtsecret,
            {expiresIn:"2h"}
        )
        res.status(200).json({ message: "Login successful", token,user });
        
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
