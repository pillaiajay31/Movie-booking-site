import mongoose, { model } from "mongoose";
import { type } from "os";
import Booking from "./booking.model";

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email:{
        type: String,
        unique: true,
    },
    password: {
        type: String,
        minLength: true,
        minLength: 6,
    },
    bookings: [{
        type: mongoose.Types.ObjectId,
        ref: 'Booking',
    }]
})

const User = mongoose.models.User || mongoose.model("User", UserSchema, 'users');
export default User;
