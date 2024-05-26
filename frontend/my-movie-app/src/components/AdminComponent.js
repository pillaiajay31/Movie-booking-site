import React, { useState, useEffect } from 'react';
import adminService from '../services/adminService';

const AdminComponent = () => {
    const [admins, setAdmins] = useState([]);
    const [admin, setAdmin] = useState({ email: '', password: '', movies: [] });

    useEffect(() => {
        console.log('Fetching admins...');
        adminService.getAdmins()
            .then(response => {
                console.log('Admins fetched:', response.data.admins);
                setAdmins(response.data.admins);
            })
            .catch(error => console.error('Error fetching admins:', error));
    }, []);

    const handleChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        console.log('Saving admin:', admin);
        adminService.saveAdmin(admin)
            .then(() => {
                console.log('Admin saved successfully');
                alert('Admin saved');
            })
            .catch(error => console.error('Error saving admin:', error));
    };

    return (
        <div>
            <h1>Admins</h1>
            <input type="text" name="email" placeholder="Email" onChange={handleChange} value={admin.email} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} value={admin.password} />
            <button onClick={handleSave}>Save Admin</button>
            <ul>
                {admins.map((admin, index) => (
                    <li key={index}>{admin.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminComponent;
