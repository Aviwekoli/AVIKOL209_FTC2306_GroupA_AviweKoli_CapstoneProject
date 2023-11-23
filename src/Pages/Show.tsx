import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Season from './Season';
import Episode from './Episodes';

// import withLoading from '../Components/WithLoading.tsx';
// import Loading from './Loading';



import showStyle from './showStyles.module.css';

interface Details {
    id: string;
    title: string;
    description: string;
    seasons: Array<string>;
    image: string;
    genres: Array<string>;
    updated: string;
}

const Show: React.FC = () => { 

    const { showId } = useParams();

    const [show, setShow] = useState<Details>([]);
    const [openSeasons, setOpenSeasons] = useState<{ [key: number]: boolean }>({});

    // useEffect(() => {
    //     try {
    //       fetch(`https://podcast-api.netlify.app/id/${showId}`)
    //       .then(res => res.json())
    //       .then(data => setShow(data))
    //     } catch (error) {
    //         console.error(error.message)
    //     }
    // },[showId]);

    useEffect(()=>{
        const fetchFunc = async () => {
            try {
                const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
                const data = await response.json();
                setShow(data)
            } catch (error) {
                console.error(error.message)
            }
        };
        fetchFunc();
    },[showId]);

    const handleSeason = (seasonNumber: number) => {
        setOpenSeasons((prevOpenSeasons) => ({
          ...prevOpenSeasons,
          [seasonNumber]: !prevOpenSeasons[seasonNumber],
        }));
    };

    const handleLike = () => {};

    return (
        <>
          <div className={showStyle.header}>
            <img src={show.image} alt="Show image" className={showStyle.image} />
            <div>
              <h2>{show.title}</h2>
              <p>{show.description}</p>
              <h4>{show.seasons ? `${show.seasons.length} Seasons` : 'No Seasons available'}</h4>
            </div>
          </div>
          {show.seasons ? show.seasons.map(season => 
            <div key={uuidv4()}>
                < Season 
                season={season}
                handleSeason={() => handleSeason(season.season)}
                />
                {openSeasons[season.season] ? season.episodes.map(episode =>
                    <div key={uuidv4()}>
                        < Episode 
                        episode={episode}
                        handleLike={handleLike}
                        />
                    </div> ): null}
            </div>
               ): null}
        </>
      )
}
export default Show;