import React, {useState, useRef} from 'react';
import showStyles from './showStyles.module.css';
import Like from './Like';
import Loading from '../Components/Loading';
import AudioPlayer from '../Components/AudioPlayer'

interface EpisodeInfo {
    title: string;
    description: string;
    episode: number;
    file: string;
}

// const Episode: React.FC<{ episode: EpisodeInfo}> = ({episode, season, onPlay }) => {
const Episode: React.FC<{ episode: EpisodeInfo; season: SeasonInfo; onPlay: () => void }> = ({
    episode,
    season,
    onPlay,
    isPlaying
  }) => {    
const audioRef = useRef(null);

  //  const [isPlaying, setIsPlaying] = useState(false);


   const handlePlay = () => {
    // setIsPlaying(true);
    onPlay();
  };

  const handleStop = () => {
    setIsPlaying(false);
  };
  //  const handlePlayClick = () => {
  //   const currentlyPlayingAudio = document.querySelector('audio[data-playing="true"]') as HTMLAudioElement;
  //   if (currentlyPlayingAudio && currentlyPlayingAudio !== audioRef.current) {
  //     currentlyPlayingAudio.pause();
  //     currentlyPlayingAudio.removeAttribute('data-playing');
  //   }

  //   if (audioRef.current) {
  //     audioRef.current.play();
  //     audioRef.current.setAttribute('data-playing', 'true');
  //   }
  // };

  return (
    <div className={showStyles.episodeContainer}>
      <button className={showStyles.episodePreview}>
        <div className={showStyles.episodeInfo}>
          <h3>
            Episode {episode.episode}
            <span>({episode.title})</span>
          </h3>
          <p>{episode.description}</p>
        </div>
        <div className={showStyles.favorite}>
          <Like />
          <button onClick={handlePlay}>Play</button>
        </div>
      </button>
      {isPlaying && (
        <div className={showStyles.audioPlayerContainer}>
          <AudioPlayer audioSource={episode.file}
           showName={episode.title} 
           episodeNumber={episode.episode}
           seasonNumber={season.season}
           seasonName={season.title}
           showImage={season.image}
          onStop={handleStop} 
           autoPlay={true}/>
          {/* onStop={handleStop}
          autoPlay={true} */}
        </div>
      )}
    </div>
  );


};

export default Episode;

// return (
//   <>
//       <button className={showStyles.episodePreview}>
//           <div className={showStyles.episodeInfo}>
//               <h3>Episode {episode.episode}<span>({episode.title})</span></h3>
//               <p>{episode.description}</p>
//           </div>
//           <div className={showStyles.favorite}>
//               < Like />
//               <button onClick={handlePlayClick}>PLAY</button>
//               <audio ref={audioRef} src={episode.file} />
//           </div>
//       </button>
//   </>
// )