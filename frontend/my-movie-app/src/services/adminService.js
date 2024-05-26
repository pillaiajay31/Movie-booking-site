import axios from 'axios';

const API_URL = 'https://movie-ticket-booking-site.onrender.com/admins';

const saveAdmin = (adminData) => axios.post(API_URL, adminData);
const getAdmins = () => axios.post(`${API_URL}/table`);
const updateAdmin = (id, adminData) => axios.post(`${API_URL}/${id}`, adminData);
const loginAdmin = (credentials) => axios.post(`${API_URL}/login`, credentials);

export default {
    saveAdmin,
    getAdmins,
    updateAdmin,
    loginAdmin,
};
