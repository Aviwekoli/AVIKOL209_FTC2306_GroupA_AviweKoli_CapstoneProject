import React, {useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { usePalette } from 'react-palette';
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

const Show: React.FC<{ onPlay: () => void; onStop: () => void }> = ({handlePlayClick}) => {
    const location = useLocation();
    const { token } = location.state;
    const { showId } = useParams();

    const [show, setShow] = useState<Details>([]);
    const [openSeasons, setOpenSeasons] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
      console.log('Token:', token);
    }, [token]);

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

    // const handleLike = () => {};

    const formattedGenres = show.genres
    ? show.genres.reduce((acc, genre, index, array) => {
        if (genre !== 'All') {
          if (index === array.length - 1) {
            return acc ? acc + ` and ${genre}` : `${genre}`;
          } else {
            return acc ? acc + `, ${genre}` : `${genre}`;
          }
        }
        return acc;
      }, '')
    : '';

    const dateFormat = (dateString: string): string => {
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
      return formattedDate;
    };
 
    return (
        <div style={{paddingLeft: '200px'}}>
          <div style={{position: 'sticky', top: '0', textAlign:'center', background:'rgb(9, 9, 17)', marginTop: '0', fontSize:'small'}}><h1>{show.title}</h1></div>
          <div className={showStyle.header}>
            <div className={showStyle.inner}>
              <div className={showStyle.details}>
                <p >{show.description}</p>
                <h2><span>Seasons: </span>{show.seasons? show.seasons.length: null}</h2>
                <h2><span>Genres: </span>{formattedGenres}</h2>
                <h2><span>Updated: </span>{dateFormat(show.updated)}</h2>
              </div>
              <img src={show.image} alt="Show image" className={showStyle.image} />
            </div>
          </div>
          {show.seasons ? show.seasons.map((season, index) => 
            <div key={uuidv4()}>
                < Season 
                handlePlayClick={handlePlayClick}
                token={token}
                season={season}
                show={show}
                updated={show.updated}
                //onPlay={onPlay}
                //onStop={onStop}
                handleSeason={() => handleSeason(index + 1)}
                isOpen={openSeasons[index + 1]}
                />
                {openSeasons[index + 1] ? season.episodes.map(episode =>
                    <div key={uuidv4()}>
                        < Episode 
                        handlePlayClick={handlePlayClick}
                        token={token}
                        episode={episode}
                        season={season}
                        show={show.title}
                        image={season.image}
                        updated={show.updated}
                        //onPlay={onPlay}
                        //onStop={onStop}
                        //handleLike={handleLike}
                        //isPlaying={isPlaying}
                        />
                    </div> ): null}
            </div>
               ): null}
        </div>
      )
}
export default withLoading(Show);

   // const [textColor, setTextColor] = useState('#FFFFFF'); // Default text color

    // // Extract color palette from the image
    // const { data, loading, error } = usePalette(show.image);
  
    // // Determine text color based on the average color of the image
    // useEffect(() => {
    //   if (!loading && !error && data && data.vibrant) {
    //     const averageColor = data.vibrant;
    //     setTextColor(getTextColor(averageColor));
    //   }
    // }, [loading, error, data]);
  
    // // Function to determine text color based on background color
    // const getTextColor = (bgColor) => {
    //   const brightness = calculateBrightness(bgColor);
    //   return brightness > 0.5 ? '#000000' : '#FFFFFF'; // Choose black or white based on brightness
    // };
  
    // // Function to calculate brightness
    // const calculateBrightness = (color) => {
    //   // Use the W3C formula for calculating relative luminance
    //   const luminance = 0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2];
    //   return luminance / 255;
    // };