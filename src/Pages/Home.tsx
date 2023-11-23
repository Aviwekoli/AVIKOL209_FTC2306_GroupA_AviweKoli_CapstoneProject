import React from 'react';
import withLoading from '../Components/WithLoading.tsx';

import NavBar from '../Components/PlayBar';
import Slider from '../Components/Slider';
import Filters from '../Components/Filters';
import Shows from '../Components/Shows';
import Logout from '../Components/Logout';
import Search from '../Components/search';

import homeStyles from './home.module.css';

const Home: React.FC = ({token}) => {

    console.log(token);

    return (
        <div className={homeStyles.body}>
            <div className={homeStyles.extra}>
                <h3>LOGO</h3>
                < Search />
                <h3>Favorites</h3>
                <h3>Recently Listened</h3>
                < Logout />
            </div>
            < Slider />
            <div className={homeStyles.main}>
                < Shows />
            </div>

        </div>

    )
}
export default withLoading(Home);