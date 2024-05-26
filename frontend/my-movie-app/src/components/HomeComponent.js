import React, { useEffect } from 'react';

const HomeComponent = () => {
    useEffect(() => {
        console.log('HomeComponent mounted');
    }, []);

    return (
        <div>
            <h1>Welcome to the App</h1>
            <p>Select a section from the menu</p>
        </div>
    );
};

export default HomeComponent;
