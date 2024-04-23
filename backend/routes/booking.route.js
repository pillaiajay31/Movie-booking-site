import express from "express";
import { getBooking, newBooking } from "../controllers/booking.controller";

const bookingRoute = express();

bookingRoute.post('/newBooking',newBooking);
bookingRoute.post('/table/:id',getBooking);
bookingRoute.delete('/:id',getBooking);

export default bookingRoute;