import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Season from './Season';
import Episode from './Episodes';

import withLoading from '../Components/WithLoading.tsx';
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

const Show: React.FC<{ onPlay: () => void; onStop: () => void }> = ({ onPlay, onStop, isPlaying }) => {

    const { showId } = useParams();

    const [show, setShow] = useState<Details>([]);
    const [openSeasons, setOpenSeasons] = useState<{ [key: number]: boolean }>({});

    useEffect(()=>{
        const fetchFunc = async () => {
            try {
                const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
                const data = await response.json();
                setShow(data)

                // Initialize openSeasons state based on the number of seasons
                const initialOpenSeasons = {};
                data.seasons.forEach((season, index) => {
                  initialOpenSeasons[index + 1] = false; // Assuming season numbers start from 1
                });
                setOpenSeasons(initialOpenSeasons);
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
        <div style={{paddingLeft: '200px'}}>
          <div className={showStyle.header}>
            <div>
              <h2>{show.title}</h2>
              <p>{show.description}</p>
              <h4>{show.seasons ? `${show.seasons.length} Seasons` : 'No Seasons available'}</h4>
            </div>
            <img src={show.image} alt="Show image" className={showStyle.image} />
          </div>
          {show.seasons ? show.seasons.map((season, index) => 
            <div key={uuidv4()}>
                < Season 
                season={season}
                onPlay={onPlay}
                onStop={onStop}
                handleSeason={() => handleSeason(index + 1)}
                isOpen={openSeasons[index + 1]}
                />
                {openSeasons[index + 1] ? season.episodes.map(episode =>
                    <div key={uuidv4()}>
                        < Episode 
                        episode={episode}
                        season={season}
                        onPlay={onPlay}
                        onStop={onStop}
                        handleLike={handleLike}
                        isPlaying={isPlaying}
                        />
                    </div> ): null}
            </div>
               ): null}
        </div>
      )
}
export default withLoading(Show);