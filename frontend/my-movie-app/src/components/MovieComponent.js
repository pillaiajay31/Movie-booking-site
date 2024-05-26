import React, { useState, useEffect } from 'react';
import movieService from '../services/movieService';

const MovieComponent = () => {
    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState({ title: '', director: '', releaseDate: '' });

    useEffect(() => {
        console.log('Fetching movies...');
        movieService.getMovies()
            .then(response => {
                console.log('Movies fetched:', response.data.movies);
                setMovies(response.data.movies);
            })
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        console.log('Saving movie:', movie);
        movieService.saveMovie(movie)
            .then(() => alert('Movie saved'))
            .catch(error => console.error('Error saving movie:', error));
    };

    return (
        <div>
            <h1>Movies</h1>
            <input type="text" name="title" placeholder="Title" onChange={handleChange} value={movie.title} />
            <input type="text" name="director" placeholder="Director" onChange={handleChange} value={movie.director} />
            <input type="date" name="releaseDate" placeholder="Release Date" onChange={handleChange} value={movie.releaseDate} />
            <button onClick={handleSave}>Save Movie</button>
            <ul>
                {movies.map((movie, index) => (
                    <li key={index}>{movie.title} - {movie.director}</li>
                ))}
            </ul>
        </div>
    );
};

export default MovieComponent;
