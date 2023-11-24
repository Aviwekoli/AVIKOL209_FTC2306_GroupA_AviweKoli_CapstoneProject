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
                <div className={homeStyles.top}>
                    <h3>LOGO</h3>
                    < Search />
                </div>
                <div className={homeStyles.bottom}>
                    <button>Go to Favorites</button>
                    <button> Go to Recently Listened</button>
                    < Filters />
                    < Logout />
                </div>
            </div>
           
            <div className={homeStyles.main}>
                 < Slider />
                < Shows />
            </div>

        </div>

    )
}
export default withLoading(Home);