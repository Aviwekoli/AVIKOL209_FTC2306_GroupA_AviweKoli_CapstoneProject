import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({token}) => {

    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();
        sessionStorage.removeItem('token');
        navigate('/')
    }
    return (
        <>
            <h2>Welcome Home</h2>
            <button onClick={handleLogout}>Log out</button>
        </>

    )
}
export default Home;