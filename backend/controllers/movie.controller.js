import Movie from '../models/movie.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Admin from '../models/admin.model';

export const addMovie = async function(req,res,next)
{
    const extractedToken = req.headers.authorization.split(" ")[1];
    if(!extractedToken && extractedToken.trim() ==="")
    {
        return res.status(404).json({message:"Token not found"});
    }

    var adminId;
    jwt.verify(extractedToken, process.env.SECRET_KEY,(error,decrypted)=>{
        if(error)
        {
            return res.status(404).json({message:`${error.message}`})
        }
        else
        {
            adminId = decrypted.id;
            return;
        }


    });

    const title = req.body.title;
    const description = req.body.description;
    const releaseDate = req.body.releaseDate;
    const posterUrl = req.body.posterUrl;
    const featured = req.body.featured;
    const cast = req.body.cast;
    // const booking = req.body.booking;
    let movie;

    if(title !== undefined && title!=='' && description !== undefined && description !=='' && releaseDate !== undefined && releaseDate !== ''
     && posterUrl !== undefined  && posterUrl !== '' && featured !== undefined && featured !== '' 
       && cast !== undefined && cast !== '' )
    {
        try{ 
                movie = new Movie({
                    title,
                    description,
                    posterUrl,
                    featured,
                    cast,
                    admin : adminId,
                    releaseDate: new Date(`${releaseDate}`)
                });

            const session = await mongoose.startSession();
            const adminUser = await Admin.findById(adminId);
            
            if (!adminUser) {
                throw new Error('Admin not found');
            }            
            session.startTransaction();
            await movie.save({session});
            adminUser.moviesAdded.push(movie);
            await adminUser.save({ session });
            await session.commitTransaction();
            }
        catch(e)
        {
            throw new Error(e);  
        }
    }
    if(!movie)
    {
        return res.status(404).json({message:"Failed saving Movie"});
    }
    return res.status(200).json({ movie });
 }
export const getMovies = async function(req,res,next)
{
    var movie;
    try
    {
        movie = await Movie.find({});
        
    }
    catch(e)
    {
        throw new Error(e)
    }
    if(!movie)
    {
        return res.status(400).json({message: "No Movies"})
    }
    return res.status(200).json({ movie })
}   

export const getMovieById = async function (req,res)
{
    var id = req.body.id;
    var movie;
    if(id !== undefined && id !=="")
    {
        try 
        {
            movie = await Movie.findById(id);
            if(!movie)
            {
                return res.status(404).json({message:"Movie not found"});
            }
        }
        catch(e)
        {
            throw new Error(e);
        }
        return res.status(200).json({ movie });

    }
}