import axios from 'axios';

const API_URL = 'https://movie-ticket-booking-site.onrender.com/movies';

const saveMovie = (movieData) => axios.post(API_URL, movieData);
const getMovies = () => axios.post(`${API_URL}/table`);
const updateMovie = (id, movieData) => axios.post(`${API_URL}/${id}`, movieData);
const deleteMovie = (id) => axios.delete(`${API_URL}/${id}`);

export default {
    saveMovie,
    getMovies,
    updateMovie,
    deleteMovie,
};
