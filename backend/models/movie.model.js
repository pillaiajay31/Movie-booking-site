import mongoose from 'mongoose';
import { features } from 'process';

const MovieSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    releaseDate: {
        type: Date
    },
    posterUrl: {
        type: String
    },
    cast:[{
        type: String
    }],
    featured: {
        type: Boolean
    },
    bookings: [{
        type: mongoose.Types.ObjectId,
        ref: 'Booking'
    }],
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'Admin',
    },
});

var Movie = mongoose.model("Movie", MovieSchema, "movies") 
export default Movie;