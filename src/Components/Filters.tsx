import React, { useState, useEffect } from 'react';
import filtersStyles from './filterStyles.module.css';
import genresObject from '../assets/genres.ts';

interface FiltersProps {
  shows: object;
  updateShows: (sortedShows: object) => void;
}

const Filters: React.FC<FiltersProps> = ({ shows, updateShows }) => {
  const [originalShows, setOriginalShows] = useState(shows);
  const [filteredShows, setFilteredShows] = useState(shows);
  
  const [sortBy, setSortBy] = useState<string | null>('');

  console.log(shows, sortBy, filteredShows)

  const handleSort = (sortType: string) => {
    let sorted;
    switch (sortType) {
      case 'all':
        sorted = [...shows].map(a=> a);
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
  
    const handleGenreFilter = (selectedGenre: string) => {
      let filtered;
  
      if (selectedGenre === "All") {
        filtered = originalShows;
      } else {
        filtered = originalShows.filter((show) => show.genres.includes(selectedGenre));
      }
  
      setFilteredShows(filtered);
      updateShows(filtered);
    };
  
    useEffect(() => {
      setOriginalShows(shows);
      setFilteredShows(shows);
    }, [shows]);

  return (
    <>
      <div className={filtersStyles.container}>
        <h2>SORT BY:</h2>
        {/* <button className={filtersStyles.btn} onClick={() => handleSort('all')}>ALL</button> */}
        <div>
          <button className={filtersStyles.btn} onClick={() => handleSort('atoz')}>A - Z</button>
          <button className={filtersStyles.btn} onClick={() => handleSort('ztoa')}>Z - A</button>
        </div>
        <div>
        <button className={filtersStyles.btn} onClick={() => handleSort('new')}>Most Recent</button>
          <button className={filtersStyles.btn} onClick={() => handleSort('old')}>Least Recent</button>
        </div>
        <h2>Select Genre:</h2>
        <select onClick={(e: Event<HTMLButtonElement>) => handleGenreFilter(e.target.value)}>
        {Object.entries(genresObject).map(([key, value]) => (
          <option key={key} value={value}>
            {value}
          </option>
        ))}
      </select>
      </div>
    </>
  );
};

export default Filters;
