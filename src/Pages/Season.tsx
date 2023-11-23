import React from 'react';
import showStyle from './showStyles.module.css';

interface SeasonInfo {
    season: number;
    title: string;
    image: string;
    episodes: Array<object>;
}

const Season: React.FC = ({season, handleSeason}) => {

    return (
        <button className={showStyle.preview} onClick={handleSeason}>
            <img src={season.image} alt="" className={showStyle.previewImage} />
            <div className={showStyle.previewInfo}>
                <h3 className={showStyle.title}>Season {season.season}</h3>
                <h3>{season.title}</h3>
            </div>
        </button>
    )
}
export default Season;