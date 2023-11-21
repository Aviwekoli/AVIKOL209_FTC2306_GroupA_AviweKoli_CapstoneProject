import React, { useState, useEffect} from 'react';
import showsStyle from './showsStyles.module.css';
import Loading from './Loading';
import Filters from './Filters';
import genres from '../assets/genres.ts';

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

    const [shows, setShows] = useState<showsInfo>([]);
    const [sortBy, setSortBy] = useState(null);

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
    }, []);

    const handleSort = (sortType) => {
        let sorted;

        switch(sortType){
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
    return (
        <>
        <div className={showsStyle.container}>
            <h3>SORT BY:</h3>
            <button onClick={() => handleSort('atoz')} >A - Z</button>
            <button onClick={() => handleSort('ztoa')}>Z - A</button>
            <button onClick={() => handleSort('new')}>Most Recent</button>
            <button onClick={() => handleSort('old')}>Least Recent</button>
            <select type="" placeholder="GENRES">
                {genres.map(genre => <option value="">{genre}</option>)}
            </select>
        </div>
        {loading? (
            <Loading />
        ):(
            shows.map(show =>{
                return (
                    <button key={show.id} className={showsStyle.preview}>
                    <img src={show.image} alt="Show image" className={showsStyle.img} />
                    <h3 className={showsStyle.title}>{show.title}</h3>
                </button>
                )
            })
        )}
        </>
    )
}

export default Shows;