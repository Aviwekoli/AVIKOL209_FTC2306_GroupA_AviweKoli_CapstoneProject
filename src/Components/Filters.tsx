import React, { useState } from 'react';
import filtersStyles from './filterStyles.module.css';
import genresObject from '../assets/genres.ts';
import genresArr from '../assets/genresArr.ts'

interface FiltersProps {
  shows: showsInfo[];
  updateShows: (sortedShows: showsInfo[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ shows, updateShows }) => {
  const [sortBy, setSortBy] = useState<string | null>('');

  const handleSort = (sortType: string) => {
    let sorted: showsInfo[] = [];

    switch (sortType) {
      case 'all':
        sorted = shows;
        break;
      case 'atoz':
        sorted = [...shows].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'ztoa':
        sorted = [...shows].sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'new':
        sorted = [...shows].sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());
        break;
      case 'old':
        sorted = [...shows].slice().sort((a, b) => new Date(a.updated).getTime() - new Date(b.updated).getTime());
        break;
      default:
        sorted = shows;
    }

    setSortBy(sortType);
    updateShows(sorted);
  };
  

    const handleGenreFilter = (selectedGenre) => {
        updateShows(shows);
        let filteredShows;
        if (selectedGenre === "All") {
        filteredShows = [...shows];
        } else {
        filteredShows = shows.filter((show) => {    
            const includesGenre = show.genres.includes(selectedGenre);
            console.log("Includes Genre:", includesGenre);
            return includesGenre;
        });
        }
        updateShows(filteredShows);
    };

  return (
    <>
      <div className={filtersStyles.container}>
        <h3>SORT BY:</h3>
        <div>
          <button className={filtersStyles.btn} onClick={() => handleSort('atoz')}>A - Z</button>
          <button className={filtersStyles.btn} onClick={() => handleSort('new')}>Most Recent</button>
        </div>
        <div>
          <button className={filtersStyles.btn} onClick={() => handleSort('ztoa')}>Z - A</button>
          <button className={filtersStyles.btn} onClick={() => handleSort('old')}>Least Recent</button>
        </div>
        <select onChange={(e) => handleGenreFilter((e.target.value))}>
          {genresArr.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Filters;
