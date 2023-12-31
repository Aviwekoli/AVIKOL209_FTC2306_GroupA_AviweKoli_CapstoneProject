import React from 'react';
import { useNavigate }  from 'react-router-dom';

interface showsProps {
    shows: object;
    token: object;
}
import showsStyle from './showsStyles.module.css';

const Shows: React.FC<showsProps> = ( {shows, token}) => {

    const navigate = useNavigate();

    const dateFormat = (dateString: string): string => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };
    const handleShowClick = (showId: string) => {
        navigate(`/show/${showId}`, {state: {token}});
    }
    

    return (
        < div className={showsStyle.showsContainer}>
            {/* <h2>Shows</h2> */}
            {
                shows.map(show =>{
                    const date = dateFormat(show.updated);
                    return (
                        <button key={show.id} className={showsStyle.preview} onClick={()=>{handleShowClick(show.id)}}>
                            <div>
                                <h1 className={showsStyle.title}>{show.title}</h1>
                            </div>
                            <div className={showsStyle.middle2}>
                                <img src={show.image} alt="Show image" className={showsStyle.image} />

                                <div className={showsStyle.info}>
                                    <p><strong>{show.seasons > 1 ? "Seasons : ": "Season : "}</strong> {show.seasons} </p>
                                    <p className={showsStyle.date}> <strong>Updated:</strong> {date}</p>
                                    <p><strong>Genres ({show.genres.length})</strong></p>
                                    {show.genres.map((genre, index) => (
                                            <p key={index}>{genre}</p>
                                    ))}
                                </div>
                            </div>
                    </button>
                    )
                })
            }

        </div>
    )
}

export default Shows;