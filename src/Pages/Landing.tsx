import React from 'react';
import landingStyles from './landing.module.css';
import {useNavigate } from 'react-router-dom';
import WithLoading from '../Components/WithLoading'

const Landing: React.FC = () => {
    const navigate = useNavigate();

    // const landingStyles = {
    //     background: url('../assets/vector-abstract-icon-microphone-digital-sound-wave-dark-blue-color-background_43778-487.jpg'),
    //     height: '100vh',
    //     width: '100%',
    // }

    return (
        <div className={landingStyles.home}>
            <div>
                <h1>G-Waves</h1>
                <button className={landingStyles.login} onClick={()=> navigate('/login')} >Sign In</button>
            </div>

            <p>Explore an unlimited range of Podcast Shows. 
            Create your own custom playlists from the episodes you cannot go a day without
            </p>
            <p className={landingStyles.start} >Ready to start? Create an account below</p>
            <button className={landingStyles.signUp} onClick={()=> navigate('/signup')} >Click to Create an Account</button>
        </div>
    )
}
export default WithLoading(Landing);