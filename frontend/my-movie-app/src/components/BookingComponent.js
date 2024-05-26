import React, { useState, useEffect } from 'react';
import bookingService from '../services/bookingService';

const BookingComponent = () => {
    const [bookings, setBookings] = useState([]);
    const [booking, setBooking] = useState({ movieId: '', userId: '', date: '' });

    useEffect(() => {
        console.log('Fetching bookings...');
        bookingService.getBookings()
            .then(response => {
                console.log('Bookings fetched:', response.data.bookings);
                setBookings(response.data.bookings);
            })
            .catch(error => console.error('Error fetching bookings:', error));
    }, []);

    const handleChange = (e) => {
        setBooking({ ...booking, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        console.log('Saving booking:', booking);
        bookingService.saveBooking(booking)
            .then(() => alert('Booking saved'))
            .catch(error => console.error('Error saving booking:', error));
    };

    return (
        <div>
            <h1>Bookings</h1>
            <input type="text" name="movieId" placeholder="Movie ID" onChange={handleChange} value={booking.movieId} />
            <input type="text" name="userId" placeholder="User ID" onChange={handleChange} value={booking.userId} />
            <input type="date" name="date" placeholder="Date" onChange={handleChange} value={booking.date} />
            <button onClick={handleSave}>Save Booking</button>
            <ul>
                {bookings.map((booking, index) => (
                    <li key={index}>{booking.movieId} - {booking.userId}</li>
                ))}
            </ul>
        </div>
    );
};

export default BookingComponent;
