import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { error } from 'console';
import userRouter from './backend/routes/user.route';
import bodyParser from 'body-parser';
import adminRouter from './backend/routes/admin.route'
import movieRouter from './backend/routes/movie.route'
import bookingRouter from './backend/routes/booking.route';

dotenv.config();



const app = express();
const PORT = process.env.PORT || 8000 ;
app.use(express.json());
app.use("/users",userRouter)
app.use("/admins",adminRouter)
app.use("/movies",movieRouter)
app.use("/bookings",bookingRouter)
mongoose.connect(
    `mongodb+srv://pillaiajay42:${process.env.MONGODB_PASSWORD}@cluster0.vo8kvds.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
).then(()=>
    app.listen(PORT,()=>console.log("Connected to DB and running")
    )
    ).catch((error)=>{
        console.log(error)
    });


