import React, { useRef, useState, useEffect } from 'react';
import audioStyles from './AudioStyles.module.css';
import { FaRegCirclePause, FaRegCirclePlay, FaRegCircleStop } from "react-icons/fa6";
import  supabase from '../API/client.ts';

const Audio = ({token, audioSource, showName,showImage, episodeNumber, seasonNumber, seasonName, onStop }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const userId = token? token.user.id : null;

  useEffect(() => {
    const storedEpisode = JSON.parse(localStorage.getItem('lastListenedEpisode') || '{}');
    if (storedEpisode.showName && storedEpisode.episodeNumber) {
      // Set the current episode to the last listened episode
      // This can be adjusted based on your application's structure
      console.log('Setting last listened episode:', storedEpisode);
      showName = storedEpisode.showName;
      episodeNumber = storedEpisode.episodeNumber;
    }
  }, []);

  useEffect(() => {
    // Save the last listened episode to localStorage
    localStorage.setItem('lastListenedEpisode', JSON.stringify({ showName, episodeNumber }));
  }, [showName, episodeNumber]);

  useEffect(() => {
    // Handle beforeunload event
    const handleBeforeUnload = (event) => {
      if (isPlaying) {
        const confirmationMessage = 'Are you sure you want to leave? Your episode is still playing.';
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isPlaying]);

  useEffect(() => {
    // Save the timestamp periodically or when the user pauses/stops
    const saveTimestamp = async () => {
      if (!userId) {
        return;
      }

      const { data, error } = await supabase
        .from('listening_history')
        .upsert(
          [
            {
              user_id: userId,
              show_name: showName,
              episode_number: episodeNumber,
              timestamp: currentTime,
            },
          ],
          { onConflict: ['show_name', 'episode_number'] }
        );

      if (error) {
        console.error('Error saving timestamp:', error.message);
      }
    };

    const interval = setInterval(saveTimestamp, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [currentTime, userId, showName, episodeNumber]);

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

    const handleEnded = async () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      onStop(); // Callback to notify that the episode has ended

      if (!userId) {
        return;
      }

      // Save the completed episode to Supabase
      const { error } = await supabase
        .from('completed_episodes')
        .upsert(
          [
            {
              user_id: userId,
              show_name: showName,
              episode_number: episodeNumber,
            },
          ],
          { onConflict: ['show_name', 'episode_number'] }
        );

      if (error) {
        console.error('Error saving completed episode:', error.message);
      }
    };

    audioElement.addEventListener('timeupdate', handleTimeUpdate);
    audioElement.addEventListener('durationchange', handleDurationChange);
    audioElement.addEventListener('ended', handleEnded);

    return () => {
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      audioElement.removeEventListener('durationchange', handleDurationChange);
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [isPlaying, showName, episodeNumber, userId]);

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      onStop(); // Callback to notify that the episode has stopped
    }
  };

  const handleResetProgress = async () => {
    if (!userId) {
      return;
    }

    // Clear the listening history and reset progress in Supabase
    const { error } = await supabase
      .from('listening_history')
      .delete()
      .eq('user_id', userId);

    if (error) {
      console.error('Error resetting progress:', error.message);
    }
  };

  console.log(showName, showImage)
  return (
    <div className={audioStyles.container}>
      <div className={audioStyles.info}>
        <img src={showImage} alt="" />
        <div>
          <h3>{showName}</h3>
          <h3>{seasonName} {seasonNumber} : {episodeNumber}</h3>
        </div>
      </div>
      <div className={audioStyles.buttons}>
        {/* {isPlaying ? <FaRegCirclePause onClick={handlePlayPause} /> : <FaRegCirclePlay onClick={handlePlayPause} />} */}
        {isPlaying ? (
            <FaRegCirclePause onClick={handlePlayPause} />
            ) : (
              <FaRegCirclePlay
                onClick={handlePlayPause}
                disabled={!audioSource}
                style={{ cursor: !audioSource ? 'not-allowed' : 'pointer' }}
              />
            )}
        <FaRegCircleStop onClick={handleStop} />
      </div>
      <div className={audioStyles.bar}>
        <p>{formatTime(currentTime)}</p>
        <progress value={currentTime} max={duration}></progress>
        <p>{formatTime(duration)}</p>
      </div>
      {/* <button onClick={handleResetProgress}>Reset Progress</button> */}
      <audio ref={audioRef} src={audioSource}></audio>
    </div>
  );
};

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default Audio;
