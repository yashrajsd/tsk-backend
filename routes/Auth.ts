import express from "express";
import { createUser, loginUser } from "../controller/authentication/auth";
export const AuthRouter = express.Router();

AuthRouter.post("/register",createUser);
AuthRouter.post("/login",loginUser)
