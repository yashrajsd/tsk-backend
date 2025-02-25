import mongoose from "mongoose";

export const Connect = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error("MongoDB URI is not defined in .env file");
        }

        await mongoose.connect(mongoURI);

        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1); 
    }
};
