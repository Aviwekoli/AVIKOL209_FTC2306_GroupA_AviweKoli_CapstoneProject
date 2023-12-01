import React, {useState, useRef, useEffect} from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaPlay } from "react-icons/fa";
import supabase from '../API/client.ts';
import { v4 as uuidv4 } from 'uuid';


import showStyles from './showStyles.module.css';
import Loading from '../Components/Loading';
import AudioPlayer from '../Components/AudioPlayer';
import Audio from '../Components/Audio'

interface EpisodeInfo {
    title: string;
    description: string;
    episode: number;
    file: string;
}
const Episode: React.FC<{ episode: EpisodeInfo; season: SeasonInfo; onPlay: () => void}> = ({
    token,
    episode,
    handlePlayClick,
    onPlayClick,

    show,
    updated,
    image,
    season,
    onPlay,
    isPlaying,
    setIsPlaying,
    onStop,
    
    
  }) => {  
      const audioRef = useRef(null);
      const episodeKey = uuidv4();

      const [isFavorite, setIsFavorite] = useState(false);

      useEffect(() => {
        // Check if the episode is in favorites when the component mounts
        checkFavorite();
      }, []);
      const checkFavorite = async () => {
        if (!token || !token.user || !token.user.id) {
          // Ensure the user is authenticated
          console.error('User not authenticated');
          return;
        }
      
        try {
          // Make a request to Supabase to check if the specific episode is in favorites
          const { data, error } = await supabase
            .from('favorites')
            .select('episodeKey')
            .eq('episodeKey', episodeKey)
            .eq('id', token.user.id);
      
          console.log('Data from checkFavorite:', data);
          console.log('Error from checkFavorite:', error);
      
          // Update the state based on the result
          setIsFavorite(!!data && data.length > 0);
        } catch (error) {
          console.error('Error in checkFavorite:', error.message);
        }
      };
      

      const handleFavorites = async () => {
        if (!token || !token.user || !token.user.id) {
          // Ensure the user is authenticated
          console.error('User not authenticated');
          return;
        }
      
        if (isFavorite) {
          // If the episode is already a favorite, do nothing
          console.log('Episode is already in favorites');
          return;
        }
        try {
          // Fetch the current list of favorites for the user
          const { data: currentFavorites, error: fetchError } = await supabase
            .from('favorites')
            .select('*')
            .eq('id', token.user.id);
      
          if (fetchError) {
            console.error('Error fetching current favorites:', fetchError.message);
            return;
          }
      
          // Check if the episode is already in favorites
          const existingFavoriteIndex = currentFavorites.findIndex(
            (fav) => fav.episodeKey === episodeKey
          );
      
          if (existingFavoriteIndex !== -1) {
            // Remove the existing entry with the same episodeKey
            currentFavorites.splice(existingFavoriteIndex, 1);
          }
      
          // Add the new episode to the existing list of favorites
          const updatedFavorites = [
            ...currentFavorites,
            {
              id: token.user.id,
              episodeKey: episodeKey,
              likedTimestamp: Date.now(),
              season: season.season,
              episode: episode.episode,
              show: show,
              updated: updated,
              image: image,
              title: episode.title,
            },
          ];
      
          // Update the favorites table with the updated list
          const { error: updateError } = await supabase
            .from('favorites')
            .upsert(updatedFavorites, { returning: 'minimal' });
      
          if (updateError) {
            console.error('Error updating favorites:', updateError.message);
            return;
          }
      
          // Toggle the isFavorite state
          setIsFavorite(true);
        } catch (error) {
          console.error('Error adding favorite:', error.message);
        }
      };
      

      // const [isFavorite, setIsFavorite] = useState(() => {
      //   const likedEpisodes = localStorage.getItem('likedEpisodes');
      //   return likedEpisodes ? JSON.parse(likedEpisodes).includes(episode.episode) : false;
      // });

      const handlePlay = () => {
        handlePlayClick({
          ...episode,
          showName: show,
          image: image,
          seasonNumber: season.season,
        }); // Pass episode information to the onPlayClick function
        
      };

  const handleStop = () => {
    setIsPlaying(false);
  }; 
 
  // console.log(episodeKey)
  // const handleFavorites = () => {
  //   const likedEpisodes = JSON.parse(localStorage.getItem('likedEpisodes') || '[]');
  //   const currentTimestamp = Date.now();
    
  //   if (isFavorite) {
  //     // Remove from favorites
  //     const updatedLikedEpisodes = likedEpisodes.filter((key) => key.episodeKey !== episodeKey);
  //     localStorage.setItem('likedEpisodes', JSON.stringify(updatedLikedEpisodes));
  //   } else {
  //     // Add to favorites with timestamp
  //     const episodeWithTimestamp = {
  //       ...episode,
  //       likedTimestamp: currentTimestamp,
  //       season: season.season,
  //       episode: episode.episode,
  //       show: show,
  //       updated: updated,
  //       image: image,
  //       episodeKey: episodeKey,
  //     };
  
  //     likedEpisodes.push(episodeWithTimestamp);
  //     localStorage.setItem('likedEpisodes', JSON.stringify(likedEpisodes));
  //   }
  
  //   // Toggle the isFavorite state
  //   setIsFavorite(!isFavorite);
  // };

  return (
    <div className={showStyles.episodeContainer} data-episode={episode.episode}>
      <button className={showStyles.episodePreview} onClick={console.log(episode)}>
        <div className={showStyles.episodeInfo}>
          <h3>
            Episode {episode.episode}
            <span> ({episode.title})</span>
          </h3>
          <p>{episode.description}</p>
        </div>
        <div className={showStyles.favorite}>
          
          <button className={showStyles.playBtn} onClick={handlePlay}>Play <FaPlay/></button>
          <button style={{background: 'transparent', border: 'none', fontSize: '30px'}} onClick={handleFavorites}>{isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}</button>
        </div>
      </button>
      {/* <Audio style={{postion:'sticky', bottom: '0'}}
        token={token}
        audioSource={episode.file} // Adjust this based on your data structure
        showName={show.name} // Adjust this based on your data structure
        onStop={handleStop}
        showImage={image} // Adjust this based on your data structure
        episodeNumber={episode.episode}
        seasonNumber={season.season} // Adjust this based on your data structure
        seasonName={season.name} // Adjust this based on your data structure
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      /> */}
    </div>
  );


};

export default Episode;
// const handleFavorites = () => {
//   setIsFavorite((prevIsFavorite) => {
//     const newLikedEpisodes = prevIsFavorite
//       ? JSON.parse(localStorage.getItem('likedEpisodes') || '[]').filter(
//           (ep: number) => ep !== episode.episode
//         )
//       : [...JSON.parse(localStorage.getItem('likedEpisodes') || '[]'), episode.episode];

//     localStorage.setItem('likedEpisodes', JSON.stringify(newLikedEpisodes));

//     // const favoritesPage = document.getElementById('favoritesPage');
//     // if (favoritesPage) {
//     //     const episodeToRemove = favoritesPage.querySelector(`[data-episode="${episode.episode}"]`);
//     //     if (episodeToRemove) {
//     //         episodeToRemove.remove();
//     //     }
//     // }
//     const favoritesPage = document.getElementById('favoritesPage');
//     if (favoritesPage) {
//       const episodeToRemove = favoritesPage.querySelector(`[data-key="${episode.key}"]`);
//       if (episodeToRemove) {
//         episodeToRemove.remove();
//       }
//     }

//     return !prevIsFavorite;
//   });
//  };

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

// // return (
// //   <>
// //       <button className={showStyles.episodePreview}>
// //           <div className={showStyles.episodeInfo}>
// //               <h3>Episode {episode.episode}<span>({episode.title})</span></h3>
// //               <p>{episode.description}</p>
// //           </div>
// //           <div className={showStyles.favorite}>
// //               < Like />
// //               <button onClick={handlePlayClick}>PLAY</button>
// //               <audio ref={audioRef} src={episode.file} />
// //           </div>
// //       </button>
// //   </>
// // )

// // const handleFavorites = async () => {
//   //   try {
//   //     // Ensure that supabase.auth is not null or undefined
//   //     if (supabase.auth) {
//   //       // Get the user directly using supabase.auth.user()
//   //       const user = supabase.auth.user();
  
//   //       if (user) {
//   //         // Check if the episode is already in favorites
//   //         const { data } = await supabase
//   //           .from('favorites')
//   //           .select()
//   //           .eq('user_id', user.id)
//   //           .eq('episode_id', `${season.title}#${season.season}#${episode.episode}`);
  
//   //         if (data && data.length > 0) {
//   //           // Episode is already in favorites, remove it
//   //           await supabase
//   //             .from('favorites')
//   //             .delete()
//   //             .eq('user_id', user.id)
//   //             .eq('episode_id', `${season.title}#${season.season}#${episode.episode}`);
  
//   //           setIsFavorite(false);
//   //         } else {
//   //           // Episode is not in favorites, add it
//   //           await supabase.from('favorites').upsert(
//   //             [
//   //               {
//   //                 user_id: user.id,
//   //                 episode_id: `${season.title}#${season.season}#${episode.episode}`,
//   //                 episode: episode.title,
//   //                 season: season.season,
//   //                 title: episode.title
//   //               },
//   //             ],
//   //             { onConflict: ['user_id', 'episode_id'] }
//   //           );
  
//   //           setIsFavorite(true);
//   //         }
//   //       } else {
//   //         // Handle the case where the user is not authenticated
//   //         console.warn('User not authenticated. Cannot add to favorites.');
//   //       }
//   //     } else {
//   //       console.warn('Supabase auth not available.');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error handling favorites:', error);
//   //   }
//   // };
//   const handleFavorites = async () => {
//     // Ensure the user is authenticated
//     // const user = supabase.auth.user();
//     // if (!user) {
//     //   // Handle the case where the user is not authenticated
//     //   alert('User not authenticated. Cannot add to favorites.');
//     //   return;
//     // }
  
//     try {
//       // Update the favorite status in the Supabase table
//       const { data, error } = await supabase
//         .from('favorites')
//         .upsert(
//           [
//             {
//               userid: uuidv4(),
//               title: episode.title,
//               episode: episode.episode,
//               isfavorite: !isFavorite,
//             },
//           ],
//           // { onConflict: ['title', 'episode'] }
//         );
  
//       if (error) {
//         throw error;
//       }
  
//       // Toggle the isFavorite state based on the current data
//       // const updatedFavorite = data ? data[0] : null;
//       // setIsFavorite(updatedFavorite ? updatedFavorite.isFavorite : false);
//     } catch (error) {
//       console.error('Error updating favorites:', error);
//     }
//   };
 // const handleFavorites = () => {
  //   const likedEpisodes = JSON.parse(localStorage.getItem('likedEpisodes') || '[]');

  //   if (isFavorite) {
  //     // Remove from favorites
  //     const updatedLikedEpisodes = likedEpisodes.filter((key) => key !== episodeKey);
  //     localStorage.setItem('likedEpisodes', JSON.stringify(updatedLikedEpisodes));
  //   } else {
  //     // Add to favorites
  //     likedEpisodes.push(episodeKey);
  //     localStorage.setItem('likedEpisodes', JSON.stringify(likedEpisodes));
  //   }

  //   // Toggle the isFavorite state
  //   setIsFavorite(!isFavorite);
  // };