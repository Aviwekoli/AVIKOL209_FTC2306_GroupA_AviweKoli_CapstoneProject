import React, {useState, useEffect }from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import supabase from '../API/client.ts';

import withLoading from '../Components/WithLoading';
import Episode from '../Pages/Episodes';
import showStyles from '../Pages/showStyles.module.css'
import favorites from './favorites.module.css';
import fav from '../assets/favorites.png'


const Favorites: React.FC = () => {
 
  const [favoriteEpisodes, setFavoriteEpisodes] = useState<string[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState<string>('original'); // Default sort option

  const favoriteEpisodesData = JSON.parse(localStorage.getItem('likedEpisodes') || '[]');


console.log(favoriteEpisodesData)
const groupEpisodesByShow = () => {
  const groupedEpisodes = {};
  favoriteEpisodesData.forEach((episode) => {
    const show = episode.show;
    if (!groupedEpisodes[show]) {
      groupedEpisodes[show] = [];
    }
    groupedEpisodes[show].push(episode);
  });
  return groupedEpisodes;
};


const sortEpisodes = (groupedEpisodes) => {
  const sortedShows = Object.keys(groupedEpisodes).sort((a, b) => {
    if (selectedSortOption === 'original') {
      return 0; // No sorting, keep the original order
    } else if (selectedSortOption === 'name-asc') {
      return a.localeCompare(b);
    } else if (selectedSortOption === 'name-desc') {
      return (b).localeCompare(a);
    } else if (selectedSortOption === 'recent') {
      // Assuming `updated` is a timestamp, adjust the comparison accordingly
      return groupedEpisodes[b][0].updated - groupedEpisodes[a][0].updated;
    } else if (selectedSortOption === 'least-recent') {
      return groupedEpisodes[a][0].updated - groupedEpisodes[b][0].updated;
    }
    return 0;
  });

  const sortedEpisodes = {};
  sortedShows.forEach((show) => {
    sortedEpisodes[show] = groupedEpisodes[show].sort((a, b) => a.updated - b.updated); // Sort episodes within each show
  });

  return sortedEpisodes;
};


const handleRemove = (episodeKeyy) => {
  console.log(episodeKeyy);
  const updatedFavorites = favoriteEpisodesData.filter((episode) => episode.episodeKey !== episodeKeyy);
  setFavoriteEpisodes(updatedFavorites);
  localStorage.setItem('likedEpisodes', JSON.stringify(updatedFavorites));
};

const handleSortChange = (event) => {
  setSelectedSortOption(event.target.value);
};

const groupedEpisodes = groupEpisodesByShow();
const sortedEpisodes = sortEpisodes(groupedEpisodes);


const dateFormat = (dateString: string): string => {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
  return formattedDate;
};
return (
  <div style={{paddingLeft:'200px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
    <div className={favorites.headerr}>
      <img src={fav} alt="" style={{width: '18%'}} />
      <div>
      <h2 style={{fontSize:'50px'}} >Your <span>Favorite</span> Episodes</h2>
      <h3 style={{fontSize:'20px'}} >{favoriteEpisodesData? favoriteEpisodesData.length : 0} {(favoriteEpisodesData && favoriteEpisodesData.length > 1 )? ' Liked Episodes' : 'Liked Episode'}</h3>
      </div>
    </div>
    <div className={favorites.main} style={{textAlign:'center', margin:'2rem', padding: '0.5rem'}}>
    <div className={favorites.dropdown}>
      <label htmlFor="sortDropdown"><span>Sort By: </span></label>
      <select id="sortDropdown" onChange={(event) => handleSortChange(event)} value={selectedSortOption}>
        <option value="original">Original</option>
        <option value="name-asc">Show Name (A to Z)</option>
        <option value="name-desc">Show Name (Z to A)</option>
        <option value="recent">Most Recent</option>
        <option value="least-recent">Least Recent</option>
      </select>
    </div>
    {Object.entries(sortedEpisodes).map(([show, episodes]) => (
        <div key={show} style={{}} >
          <h2 style={{textAlign:'left', fontSize:'large'}}>Show: <span>{show}</span></h2>
          <table style={{width: '100%'}}>
            <thead>
              <tr className={favorites.trr}>
                <th>#</th>
                <th style={{width: '350px'}}>Episode Title</th>
                <th>Date Updated</th>
                <th>Date & Time Added</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {episodes.map((episode, index) => (
                <tr key={episode.episodeKey} className={favorites.cell}>
                  <td>{index + 1}</td>
                  <td style={{display: 'flex', flexDirection:'row'}} >
                  <div>
                      <img src={episode.image} alt="" style={{width: '65px', marginLeft: '5px'}}/>
                    </div>
                    <div>
                      {episode.title}
                    </div>
                  </td>
                  <td>{dateFormat(episode.updated)}</td>
                  <td>{dateFormat(new Date(episode.likedTimestamp))} ({new Date(episode.likedTimestamp).toLocaleTimeString()})</td>
                  <td>
                    <button style={{background: 'transparent', border: 'none', fontSize: '30px'}} onClick={() => handleRemove(episode.episodeKey)}>{<FaHeart color="red" />}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  </div>
)
};

export default Favorites;

// const groupEpisodesByShow = () => {
//   const groupedEpisodes = {};
//   const sortedShows = Object.keys(groupedEpisodes).sort((a, b) => {
//     if (selectedSortOption === 'original') {
//       return 0; // No sorting, keep the original order
//     } else if (selectedSortOption === 'name-asc') {
//       return a.localeCompare(b);
//     } else if (selectedSortOption === 'name-desc') {
//       return b.localeCompare(a);
//     } else if (selectedSortOption === 'recent') {
//       // Assuming `updated` is a timestamp, adjust the comparison accordingly
//       return groupedEpisodes[b][0].updated - groupedEpisodes[a][0].updated;
//     } else if (selectedSortOption === 'least-recent') {
//       return groupedEpisodes[a][0].updated - groupedEpisodes[b][0].updated;
//     }
//     return 0;
//   });

//   sortedShows.forEach((show) => {
//     groupedEpisodes[show].sort((a, b) => a.updated - b.updated); // Sort episodes within each show
//   });

//   return groupedEpisodes;
// };

// const Favorites: React.FC = ({favoriteEpisodes, episodesData})=> {
//     const [likedEpisodes, setLikedEpisodes] = useState<number[]>([]);

//   useEffect(() => {
//     // Retrieve liked episodes from local storage
//     const storedLikedEpisodes = localStorage.getItem('likedEpisodes');
//     if (storedLikedEpisodes) {
//       setLikedEpisodes(JSON.parse(storedLikedEpisodes));
//     }
//   }, []);

//   console.log(likedEpisodes)

//   return (
//     <div>
//       <h2>Favorites</h2>
//       <div className={showStyles.episodeContainer} id="favoritesPage">
//         {likedEpisodes.length === 0 ? (
//           <p>No favorite episodes yet.</p>
//         ) : (
//           likedEpisodes.map((episodeNumber) => (
//             <Episode
//               key={episodeNumber}
//               episode={{
//                 title: `Favorite Episode ${episodeNumber}`,
//                 description: 'This is a favorite episode.',
//                 episode: episodeNumber,
//                 file: 'favorite-episode.mp3', // Replace with actual file path
//               }}
//               season={{
//                 title: 'Favorite Season',
//                 season: 1,
//                 image: 'season-image.jpg', // Replace with actual image path
//               }}
//               onPlay={() => {
//                 // Handle play logic if needed
//               }}
//               isPlaying={false}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
  // useEffect(() => {
  //   // Fetch favorite episodes from local storage on component mount
  //   const likedEpisodes = JSON.parse(localStorage.getItem('likedEpisodes') || '[]');
  //   setFavoriteEpisodes(likedEpisodes);
  // }, []);

  /// supabase
   // const [favoriteEpisodesData, setFavoriteEpisodesData] = useState([]);
  // const [selectedSortOption, setSelectedSortOption] = useState<string>('original'); // Default sort option

  // useEffect(() => {
  //   fetchFavorites();
  // }, []); // Empty dependency array ensures this effect runs once on component mount

  // const fetchFavorites = async () => {
  //   try {
  //     const { data, error } = await supabase.from('favorites').select('*');
  //     if (error) {
  //       throw error;
  //     }

  //     setFavoriteEpisodesData(data || []);
  //   } catch (error) {
  //     console.error('Error fetching favorites:', error.message);
  //   }
  // };

  // const groupEpisodesByShow = () => {
  //   const groupedEpisodes = {};
  //   favoriteEpisodesData.forEach((episode) => {
  //     const show = episode.show;
  //     if (!groupedEpisodes[show]) {
  //       groupedEpisodes[show] = [];
  //     }
  //     groupedEpisodes[show].push(episode);
  //   });
  //   return groupedEpisodes;
  // };

  // const sortEpisodes = (groupedEpisodes) => {
  //   const sortedShows = Object.keys(groupedEpisodes).sort((a, b) => {
  //     if (selectedSortOption === 'original') {
  //       return 0; // No sorting, keep the original order
  //     } else if (selectedSortOption === 'name-asc') {
  //       return a.localeCompare(b);
  //     } else if (selectedSortOption === 'name-desc') {
  //       return b.localeCompare(a);
  //     } else if (selectedSortOption === 'recent') {
  //       // Assuming `updated` is a timestamp, adjust the comparison accordingly
  //       return groupedEpisodes[b][0].updated - groupedEpisodes[a][0].updated;
  //     } else if (selectedSortOption === 'least-recent') {
  //       return groupedEpisodes[a][0].updated - groupedEpisodes[b][0].updated;
  //     }
  //     return 0;
  //   });

  //   const sortedEpisodes = {};
  //   sortedShows.forEach((show) => {
  //     sortedEpisodes[show] = groupedEpisodes[show].sort((a, b) => a.updated - b.updated); // Sort episodes within each show
  //   });

  //   return sortedEpisodes;
  // };

  // const handleRemove = async (episodeKey) => {
  //   try {
  //     await supabase.from('favorites').delete().eq('episodeKey', episodeKey);
  //     // Fetch favorites again after deletion
  //     fetchFavorites();
  //   } catch (error) {
  //     console.error('Error removing favorite:', error.message);
  //   }
  // };

  // const handleSortChange = (event) => {
  //   setSelectedSortOption(event.target.value);
  // };

  // const groupedEpisodes = groupEpisodesByShow();
  // const sortedEpisodes = sortEpisodes(groupedEpisodes);