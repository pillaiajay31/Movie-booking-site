import React, { useState, useEffect } from 'react';
import userService from '../services/userService';

const UserComponent = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ email: '', password: '' });

    useEffect(() => {
        console.log('Fetching users...');
        userService.getUsers()
            .then(response => {
                console.log('Users fetched:', response.data.users);
                setUsers(response.data.users);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        console.log('Saving user:', user);
        userService.saveUser(user)
            .then(() => alert('User saved'))
            .catch(error => console.error('Error saving user:', error));
    };

    return (
        <div>
            <h1>Users</h1>
            <input type="text" name="email" placeholder="Email" onChange={handleChange} value={user.email} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} value={user.password} />
            <button onClick={handleSave}>Save User</button>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserComponent;
