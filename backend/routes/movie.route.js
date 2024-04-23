import {addMovie, getMovies, getMovieById} from '../controllers/movie.controller';
import express from 'express';

const movieRouter = express.Router();

movieRouter.post('/table',getMovies)
movieRouter.post('/',addMovie)
movieRouter.post('/detail',getMovieById)

export default movieRouter