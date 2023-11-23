import React, {useRef} from 'react';
import showStyles from './showStyles.module.css';
import Like from './Like'

interface EpisodeInfo {
    title: string;
    description: string;
    episode: number;
    file: string;
}

const Episode: React.FC<{ episode: episodeInfo}> = ({episode}) => {
   const audioRef = useRef(null);


   const handlePlayClick = () => {
    const currentlyPlayingAudio = document.querySelector('audio[data-playing="true"]') as HTMLAudioElement;
    if (currentlyPlayingAudio && currentlyPlayingAudio !== audioRef.current) {
      currentlyPlayingAudio.pause();
      currentlyPlayingAudio.removeAttribute('data-playing');
    }

    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.setAttribute('data-playing', 'true');
    }
  };

  return (
    <>
        <button className={showStyles.episodePreview}>
            <div className={showStyles.episodeInfo}>
                <h3>Episode {episode.episode}<span>({episode.title})</span></h3>
                <p>{episode.description}</p>
            </div>
            <div className={showStyles.favorite}>
                < Like />
                <button onClick={handlePlayClick}>PLAY</button>
                <audio ref={audioRef} src={episode.file} />
            </div>
        </button>
    </>
  )
};

export default Episode;