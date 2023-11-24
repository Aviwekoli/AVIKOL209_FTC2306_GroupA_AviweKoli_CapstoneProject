import React, { useState, useEffect } from 'react';
import { useNavigate }  from 'react-router-dom';

import showsStyle from './showsStyles.module.css';
// import Loading from './Loading';

const Shows: React.FC = ( {shows}) => {

    const navigate = useNavigate();

    const dateFormat = (dateString: string): string => {
        const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    }

    const handleShowClick = (showId: string) => {
        navigate(`/show/${showId}`);
    }

    return (
        <>
            <h2>Shows</h2>
            {
                shows.map(show =>{
                    const date = dateFormat(show.updated);
                    return (
                        <button key={show.id} className={showsStyle.preview} onClick={()=>{handleShowClick(show.id)}}>
                        <h3 className={showsStyle.title}>{show.title}</h3>
                        <img src={show.image} alt="Show image" className={showsStyle.img} />
                        <h4>{show.seasons} {show.seasons > 1 ? "Seasons": "Season"} </h4>
                        {show.genres.map((genre, index) => (
                                <p key={index}>{genre}</p>
                        ))}
                        <h4 className={showsStyle.date}>Updated: {date}</h4>

                    </button>
                    )
                })
            }
        </>
    )
}

export default Shows;