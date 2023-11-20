import React from 'react';
import { useNavigate } from 'react-router-dom';
import withLoading from '../Components/WithLoading.tsx';

import NavBar from '../Components/PlayBar';
import Slider from '../Components/Slider';
import Filters from '../Components/Filters';
import Shows from '../Components/Shows';

const Home: React.FC = ({token}) => {

    console.log(token);
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
export default withLoading(Home);