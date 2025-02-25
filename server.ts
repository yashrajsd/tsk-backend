import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Connect } from './db/db';
import { HotelRouter } from './routes/Hotel';
import { AuthRouter } from './routes/Auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;


app.use(cors()); 
app.use(express.json()); 

app.use("/api/hotels", HotelRouter);
app.use("/api/auth", AuthRouter);

app.listen(PORT, () => {
    console.log("Server listening on port:", PORT);
});

Connect();
