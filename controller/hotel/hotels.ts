import { Request, Response } from "express";

export const getSearch = async (req: Request, res: Response): Promise<void> => {
    const {user} = req.body.user;
    if(!user){
        res.json({ message: "UnAuthorized"}).status(401);
        return;
    }
    try {
        res.json({ message: "Working", status: 200 });
        return;
    } catch (err) {
        res.json({ message: "Internal server error", status: 500 });
        return;
    }
};

export const getRoomOrTable = async(req:Request,res:Response):Promise<void>=>{
    const {user} = req.body.user;
    if(!user){
        res.json({ message: "UnAuthorized"}).status(401);
        return;
    }
    try{
        res.json({ message: "Working", status: 200 });
    }catch(err){
        res.json({message:"Internal server error!! ",status:500})
    }
}

export const bookPlace = async(req:Request,res:Response):Promise<void>=>{
    const {user} = req.body.user;
    if(!user){
        res.json({ message: "UnAuthorized"}).status(401);
        return;
    }
    try{
        res.json({ message: "Working", status: 200 });
    }catch(err){
        res.json({message:"Internal server error!! ",status:500})
    }
}

export const getHistory = async(req:Request,res:Response):Promise<void>=>{
    const {user} = req.body.user;
    if(!user){
        res.json({ message: "UnAuthorized"}).status(401);
        return;
    }
    try{
        res.json({ message: "Working", status: 200 });
    }catch(err){
        res.json({message:"Internal server error!! ",status:500})
    }
}