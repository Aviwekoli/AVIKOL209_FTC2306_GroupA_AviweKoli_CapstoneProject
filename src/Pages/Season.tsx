import React from 'react';
import showStyle from './showStyles.module.css';
import { BiChevronDown,  BiChevronUp } from "react-icons/bi";


interface SeasonInfo {
    season: number;
    title: string;
    image: string;
    episodes: Array<object>;
}

// const Season: React.FC = ({season, handleSeason, isOpen}) => {
    const Season: React.FC<{ season: SeasonInfo; onPlay: () => void; onStop: () => void }> = ({
        token,
        season,
        show,
        updated,
        image,
        handleSeason,
        isOpen,
        handlePlayClick
      }) => {

    return (
        <button className={showStyle.preview} onClick={handleSeason}>
            <div className={showStyle.left}>
                    <img src={season.image} alt="" className={showStyle.previewImage} />
                    <div className={showStyle.previewInfo}>
                        <h3 className={showStyle.title}>Season {season.season}</h3>
                        <h3>{season.title}</h3>
                    </div>
            </div>
            <div className={showStyle.right}>
                        {isOpen ? <BiChevronUp /> : <BiChevronDown />}

            </div>

        </button>
    )
}
export default Season;