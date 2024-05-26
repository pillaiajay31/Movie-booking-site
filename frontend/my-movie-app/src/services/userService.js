import axios from 'axios';

const API_URL = 'https://movie-ticket-booking-site.onrender.com/users';

const saveUser = (userData) => axios.post(API_URL, userData);
const getUsers = () => axios.post(`${API_URL}/table`);
const updateUser = (id, userData) => axios.put(`${API_URL}/${id}`, userData);
const loginUser = (credentials) => axios.post(`${API_URL}/login`, credentials);

export default {
    saveUser,
    getUsers,
    updateUser,
    loginUser,
};
