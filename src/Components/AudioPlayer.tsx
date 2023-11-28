import React, { useRef, useState, useEffect } from 'react';
import audioStyles from './AudioStyles.module.css';
import { FaRegCirclePause, FaRegCirclePlay, FaRegCircleStop } from "react-icons/fa6";



const AudioPlayer = ({ audioSource, showName, onStop, showImage, episodeNumber, seasonNumber, seasonName }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(audioElement.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      onStop(); // Callback to notify that the episode has ended
    };

    audioElement.addEventListener('timeupdate', handleTimeUpdate);
    audioElement.addEventListener('durationchange', handleDurationChange);
    audioElement.addEventListener('ended', handleEnded);

    return () => {
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      audioElement.removeEventListener('durationchange', handleDurationChange);
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [isPlaying]);

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      onStop(); // Callback to notify that the episode has stopped
    }
  };

  return (
    <div className={audioStyles.container}>
      <div className={audioStyles.info}>
          <img src={showImage} alt="" />
          <div>
            <h3>{showName}</h3>
            <h4>{seasonName} {seasonNumber} : {episodeNumber}</h4>
          </div>
      </div>
      <div className={audioStyles.buttons}>
            {isPlaying ?  < FaRegCirclePause onClick={handlePlayPause} />: < FaRegCirclePlay onClick={handlePlayPause}/>}
            < FaRegCircleStop onClick={handleStop}/>
      </div>
      <div className={audioStyles.bar}>
            <p>{formatTime(currentTime)}</p>
            <progress value={currentTime} max={duration}></progress>
            <p>{formatTime(duration)}</p>
      </div>
      <audio ref={audioRef} src={audioSource} ></audio>

    </div>
  );
};

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default AudioPlayer;