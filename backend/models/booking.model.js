import mongoose, { mongo } from "mongoose";
import { type } from "os";

let BookingSchema = mongoose.Schema({

    movie: {
        type: mongoose.Types.ObjectId,
        ref: 'Movie'
    },
    date: {
        type: Date,   
    },
    seatNumber: {
        type: Number,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

});

const Booking = mongoose.model("Booking", BookingSchema, "bookings");
export default Booking