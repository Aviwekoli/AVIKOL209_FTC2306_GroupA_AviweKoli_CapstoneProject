import React, {useState, useEffect} from 'react';
import withLoading from '../Components/WithLoading.tsx';
import Loading from '../Components/Loading'

import Navbar from '../Components/Navbar';
import Slider from '../Components/Slider';
import Filters from '../Components/Filters';
import Shows from '../Components/Shows';
import genresObject from '../assets/genres.ts';

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

    console.log(token);

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
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '200px', top: '50px'}}>
            <div >
                < Navbar shows={shows} updateShows={updateShows} />
                 < Slider />
                 < Filters shows={shows} updateShows={updateShows}/>
                {loading? (
                    < Loading />
                ): (
                    < Shows shows={shows} token={token}
                />
                )}
            </div>

        </div>

    )
}
export default withLoading(Home);