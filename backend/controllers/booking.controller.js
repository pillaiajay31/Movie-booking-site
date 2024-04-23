import mongoose from 'mongoose';
import Booking from '../models/booking.model';
import Movie from '../models/movie.model';
import User from '../models/user';

export const newBooking = async (req,res)=>{

    let existingMovie;
    let existingUser;
    const movie = req.body.movie;
    const date = req.body.date;
    const seatNumber = req.body.seatNumber;
    const user = req.body.user;


    try
    {
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);
    }
    catch(e)
    {
        throw new Error(e)
    }
    if(!existingMovie)
    {
        return res.status(404).json({message: 'Movie not found'});

    }

    if(!user)
    {
        return res.status(404).json({message:"User not found"})
    }
   
    let booking;
    

    try 
    {
        booking = new Booking({
            movie,
            date: new Date(`${date}`),
            seatNumber,
            user
        });

        const session = await  mongoose.startSession();
        session.startTransaction();
        existingUser.bookings.push(booking);
        existingMovie.bookings.push(booking);
        await existingMovie.save({ session });
        await existingUser.save({ session });
        await booking.save({ session });
        session.commitTransaction();

    }
    catch(e)
    {
        throw new Error(e);
    }
    if(!booking)
    {
        return res.status(404).json({message:"Booking not done! Try again"});
    }
    return res.status(200).json({ booking });
}

export const getBooking = async (req,res,next)=>{

    const id = req.params.id;

    let booking;
    try
    {
        booking = await Booking.findById(id);
    }
    catch(e)
    {
        throw Error(e)
    }
    if(!booking)
    {
        return res.status(500).json({message:"Unexpected error"});


    }
    return res.status(200).json({ booking })

}

export const deleteBooking = async(res,req,next)=>{

    const id = req.params.id;
    let booking;
    try
    {
        booking = await Booking.findByIdAndRemove(id).populate("user movie")
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.movie.save({ session });
        await booking.user.save({ session });
        session.commitTransaction();
    }
    catch(e)
    {
       throw  Error(e)
    }
    if(!booking)
    {
        return res.status(404).json({message:"Unable to delete"});
    }
    return res.status(201).json({message:"Successfully deleted"});

}