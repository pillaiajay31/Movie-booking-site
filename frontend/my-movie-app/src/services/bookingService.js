import axios from 'axios';

const API_URL = 'https://movie-ticket-booking-site.onrender.com/bookings';

const saveBooking = (bookingData) => axios.post(API_URL, bookingData);
const getBookings = () => axios.get(`${API_URL}/table`);
const updateBooking = (id, bookingData) => axios.put(`${API_URL}/${id}`, bookingData);
const deleteBooking = (id) => axios.delete(`${API_URL}/${id}`);

export default {
    saveBooking,
    getBookings,
    updateBooking,
    deleteBooking,
};
