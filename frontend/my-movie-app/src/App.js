import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminComponent from './components/AdminComponent';
import BookingComponent from './components/BookingComponent';
import MovieComponent from './components/MovieComponent';
import UserComponent from './components/UserComponent';
import HomeComponent from './components/HomeComponent';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeComponent />} />
                <Route path="/admins" element={<AdminComponent />} />
                <Route path="/bookings" element={<BookingComponent />} />
                <Route path="/movies" element={<MovieComponent />} />
                <Route path="/users" element={<UserComponent />} />
            </Routes>
        </Router>
    );
}

export default App;
