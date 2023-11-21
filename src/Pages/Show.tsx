import React from 'react';
import { useParams } from 'react-router-dom';

interface Details {
    id: string;
    title: string;
    description: string;
    seasons: Array<string>;
    image: string;
    genres: Array<string>;
    updated: string;
}

interface Seasons {
    season: number;
    title: string;
    image: string;
    episodes: Array<object>;
}

interface Episodes {
    title: string;
    description: string;
    episode: number;
    file: string;
}

const Show: React.FC = () => { 
    const { showId } = useParams();
    return (
        <h2>Show details : {showId}</h2>
    )   
}
export default Show;