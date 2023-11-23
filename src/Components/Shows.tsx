import React, { useState, useEffect} from 'react';
// import { useHistory } from 'react-router-dom';
import {useNavigate}  from 'react-router-dom';

import showsStyle from './showsStyles.module.css';
import Loading from './Loading';
import genresObject from '../assets/genres.ts'
interface showsInfo {
    id: string;
    title: string;
    description: string;
    seasons: number;
    image: string;
    genres: Array<number>;
    updated: string;
}

const Shows: React.FC = () => {

    const navigate = useNavigate();

    const [shows, setShows] = useState<showsInfo>([]);
    const [sortBy, setSortBy] = useState(null);
    // const [genres, setGenres] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        try {
            fetch("https://podcast-api.netlify.app/shows")
            .then(response => response.json())
            .then(data => {
                setShows(data);
                setLoading(false)
            })
           
        } catch (error) {
            console.error(error.message);
            setLoading(false);
        }
    },[]);

    const handleSort = (sortType: string) => {
        let sorted: showsInfo;

        switch(sortType){
        case 'all':
            sorted = [...shows];
            break;
        case 'atoz':
            sorted = [...shows].sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'ztoa':
            sorted = [...shows].sort((a, b) => (b.title).localeCompare(a.title));
            break;
          case 'new':
            sorted = [...shows].sort((a,b) => (new Date(b.updated)).getTime() - (new Date(a.updated)).getTime());
            break;
          case 'old':
            sorted =  [...shows].slice().sort((a,b) => (new Date(a.updated)).getTime() - (new Date(b.updated)).getTime());
            break;
            default:
                sorted = shows;
            }

        setSortBy(sortType);
        setShows(sorted)
    }

    const dateFormat = (dateString: string): string => {
        const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    }

    const handleShowClick = (showId: string) => {
        navigate(`/show/${showId}`);
    }

    // const GetGenres = (showId: string) => {
    //     useEffect(() => {
    //         try {
    //            fetch(`https://podcast-api.netlify.app/id/${showId}`)
    //            .then(res => res.json())
    //            .then(data => setGenres(data.genres))
    //         } catch (error) {
    //           console.error(error.message)  
    //         }
    //     },)
    // }

    const getGenreString = (genreNumber) => genresObject[genreNumber] || 'Unknown';

    return (
        <>
        <div className={showsStyle.container}>
            <h3>SORT BY:</h3>
            <button onClick={()=> handleSort('all')}>ALL</button>
            <button onClick={() => handleSort('atoz')} >A - Z</button>
            <button onClick={() => handleSort('ztoa')}>Z - A</button>
            <button onClick={() => handleSort('new')}>Most Recent</button>
            <button onClick={() => handleSort('old')}>Least Recent</button>
            <h3>GENRES:</h3>
            {/* <select type="" placeholder="" >
                {genres.map(genre => <option value="">{genre}</option>)}
            </select> */}
        </div>
        {loading? (
            <Loading />
            ):(
            shows.map(show =>{
                const date = dateFormat(show.updated);
                return (
                    <button key={show.id} className={showsStyle.preview} onClick={()=>{handleShowClick(show.id)}}>
                    <img src={show.image} alt="Show image" className={showsStyle.img} />
                    <h3 className={showsStyle.title}>{show.title}</h3>
                    <p className={showsStyle.date}>Updated: {date}</p>
                    {/* <h4>{show.seasons} {show.seasons > 1 ? "Seasons": "Season"} </h4> */}
                    {show.genres.map((genreNumber, index) => (
                            <p key={index}>{getGenreString(genreNumber)}</p>
                    ))}
                </button>
                )
            })
        )}
        </>
    )
}

export default Shows;