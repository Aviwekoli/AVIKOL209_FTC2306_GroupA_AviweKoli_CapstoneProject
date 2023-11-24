import React, {useState, useEffect} from 'react';
import withLoading from '../Components/WithLoading.tsx';
import Loading from '../Components/Loading'

import Slider from '../Components/Slider';
import Filters from '../Components/Filters';
import Shows from '../Components/Shows';
import Logout from '../Components/Logout';
import Search from '../Components/search';
import genresObject from '../assets/genres.ts';

import homeStyles from './home.module.css';

interface showsInfo {
    id: string;
    title: string;
    description: string;
    seasons: number;
    image: string;
    genres: Array<number>;
    updated: string;
}

const Home: React.FC = ({token}) => {

    const [shows, setShows] = useState<showsInfo>([]);
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(()=>{
        const fetchFunc = async () => {
            try {
                const response = await fetch("https://podcast-api.netlify.app/shows");
                const data = await response.json();
                const getGenreString = genreNumber => genresObject[genreNumber] || 'unknown';

                const convertedData = data.map((item) => ({
                    ...item,
                    genres: item.genres.map(genreNumber => getGenreString(genreNumber))
                }))
                setShows(convertedData);
                setLoading(false);
            } catch (error) {
                console.error(error.message)
                setLoading(false)
            }
        };
        fetchFunc();
    },[]);

    const updateShows = (sortedShows: showsInfo[]) => {
        setShows(sortedShows);
      };

      const handleSearchUpdate = (searchResults) => {
        setShows(searchResults);
      };

    return (
        <div className={homeStyles.body}>
            <div className={homeStyles.sidebar}>
                <div className={homeStyles.top}>
                    <h3>LOGO</h3>
                    < Search shows={shows} updateShows={handleSearchUpdate} />
                </div>
                <div className={homeStyles.bottom}>
                    <button>Go to Favorites</button>
                    <button> Go to Recently Listened</button>
                    { loading ? (
                        < Loading />
                    ) : (
                        < Filters shows={shows} updateShows={updateShows}/>
                    )

                    }
                    < Logout />
                </div>
            </div>
           
            <div className={homeStyles.main}>
                 < Slider />
                {loading? (
                    < Loading />
                ): (
                    < Shows shows={shows}/>
                )}
            </div>

        </div>

    )
}
export default withLoading(Home);