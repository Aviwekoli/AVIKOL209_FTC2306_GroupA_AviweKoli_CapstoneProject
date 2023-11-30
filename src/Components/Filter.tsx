// Filters.tsx
import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

interface FiltersProps {
  shows: showsInfo[];
  updateShows: (sortedShows: showsInfo[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ shows, updateShows }) => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState<string>(''); // Added state for sorting
  const [searchQuery, setSearchQuery] = useState<string>(''); 

  const genresObject = {
    0: "All",
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
}
const handleGenreChange = (genreId: number) => {
    try {
      if (selectedGenres.includes(genreId)) {
        // Deselect genre
        setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
      } else {
        // Select genre
        setSelectedGenres([...selectedGenres, genreId]);
      }
      applyFilters();
    } catch (error) {
      console.error('Error in handleGenreChange:', error);
    }
  };

  const handleSortChange = (option: string) => {
    try {
      setSortOption(option);
      applyFilters();
    } catch (error) {
      console.error('Error in handleSortChange:', error);
    }
  };

  const handleSearchChange = (query: string) => {
    try {
      setSearchQuery(query);
      applyFilters();
    } catch (error) {
      console.error('Error in handleSearchChange:', error);
    }
  };

  const handleShowAll = () => {
    try {
      setSelectedGenres([]);
      updateShows(shows);
    } catch (error) {
      console.error('Error in handleShowAll:', error);
    }
  };

  const applyFilters = () => {
    try {
      const filteredShows = shows && shows.filter((show) => {
        return selectedGenres.length === 0 || show.genres.some((genreId) => selectedGenres.includes(genreId));
      });

    //   updateShows(filteredShows);
      const titleFilteredShows = fuse.search(searchQuery).map((result) => result.item);

      const genreFilteredShows =
        selectedGenres.length === 0
          ? titleFilteredShows
          : titleFilteredShows.filter((show) => show.genres.some((genreId) => selectedGenres.includes(genreId)));

      const sortedShows = sortShows(genreFilteredShows);

      updateShows(sortedShows);
    } catch (error) {
      console.error('Error in applyFilters:', error);
    }
  };

  const sortShows = (showsToSort: showsInfo[]) => {
    try {
      switch (sortOption) {
        case 'titleAsc':
          return showsToSort.slice().sort((a, b) => a.title.localeCompare(b.title));
        case 'titleDesc':
          return showsToSort.slice().sort((a, b) => b.title.localeCompare(a.title));
        case 'dateAsc':
          return showsToSort.slice().sort((a, b) => new Date(a.updated).getTime() - new Date(b.updated).getTime());
        case 'dateDesc':
          return showsToSort.slice().sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());
        default:
          return showsToSort;
      }
    } catch (error) {
      console.error('Error in sortShows:', error);
      return showsToSort; // Return the unsorted array in case of an error
    }
  };

  const fuse = new Fuse(shows, {
    keys: ['title'],
    includeScore: true,
    threshold: 0.4,
  });

  useEffect(() => {
    try {
      applyFilters();
    } catch (error) {
      console.error('Error in useEffect:', error);
    }
  }, [selectedGenres, sortOption, searchQuery]);
  
//   const handleGenreChange = (genreId: number) => {
//     if (selectedGenres.includes(genreId)) {
//       // Deselect genre
//       setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
//     } else {
//       // Select genre
//       setSelectedGenres([...selectedGenres, genreId]);
//     }
//     applyFilters();
//   };

//   const handleSortChange = (option: string) => {
//     setSortOption(option);
//     applyFilters();
//   };

//   const handleSearchChange = (query: string) => {
//     setSearchQuery(query);
//     applyFilters();
//   };

//   const handleShowAll = () => {
//     setSelectedGenres([]);
//     updateShows(shows);
//   };

//   const applyFilters = () => {
//     const filteredShows = shows && shows.filter((show) => {
//       // Check if the show has at least one selected genre
//       return selectedGenres.length === 0 || show.genres.some((genreId) => selectedGenres.includes(genreId));
//     });

//     updateShows(filteredShows);
//     const titleFilteredShows = fuse.search(searchQuery).map((result) => result.item);

//     // Apply genre filter if genres are selected
//     const genreFilteredShows =
//       selectedGenres.length === 0
//         ? titleFilteredShows
//         : titleFilteredShows.filter((show) => show.genres.some((genreId) => selectedGenres.includes(genreId)));

//     // Sort shows based on the selected sort option
//     const sortedShows = sortShows(genreFilteredShows);

//     updateShows(sortedShows);
//   };

//   const sortShows = (showsToSort: showsInfo[]) => {
//     switch (sortOption) {
//       case 'titleAsc':
//         return showsToSort.slice().sort((a, b) => a.title.localeCompare(b.title));
//       case 'titleDesc':
//         return showsToSort.slice().sort((a, b) => b.title.localeCompare(a.title));
//       case 'dateAsc':
//         return showsToSort.slice().sort((a, b) => new Date(a.updated).getTime() - new Date(b.updated).getTime());
//       case 'dateDesc':
//         return showsToSort.slice().sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());
//       default:
//         return showsToSort;
//     }
//   };

//   const fuse = new Fuse(shows, {
//     keys: ['title'], // Specify the keys to search in
//     includeScore: true,
//     threshold: 0.4, // Adjust the threshold as needed for fuzzy matching
//   });

//   useEffect(() => {
//     applyFilters();
//   }, [selectedGenres, sortOption, searchQuery]);

  return (
    <div style={{ padding: '10px', borderTop: '3.5px solid #141416', borderBottom: '3.5px solid #141416' }}>
      <h3 style={{ color: '#fdfdfd', marginBottom: '10px' }}>Filters</h3>
      <button onClick={handleShowAll} style={{ marginBottom: '10px', padding: '5px' }}>
        Show All
      </button>
      {Object.entries(genresObject).map(([genreId, genreName]) => (
        <div key={genreId} style={{ marginBottom: '5px' }}>
          <input
            type="checkbox"
            id={`genre-${genreId}`}
            checked={selectedGenres.includes(Number(genreId))}
            onChange={() => handleGenreChange(Number(genreId))}
          />
          <label htmlFor={`genre-${genreId}`} style={{ marginLeft: '5px', color: '#fdfdfd' }}>
            {genreName}
          </label>
        </div>
      ))}
      <div>
        <h4 style={{ color: '#fdfdfd', marginBottom: '10px' }}>Sort By</h4>
        <div>
          <label>
            <input type="radio" name="sort" value="titleAsc" checked={sortOption === 'titleAsc'} onChange={() => handleSortChange('titleAsc')} />
            Title A-Z
          </label>
          <label>
            <input type="radio" name="sort" value="titleDesc" checked={sortOption === 'titleDesc'} onChange={() => handleSortChange('titleDesc')} />
            Title Z-A
          </label>
          <label>
            <input type="radio" name="sort" value="dateAsc" checked={sortOption === 'dateAsc'} onChange={() => handleSortChange('dateAsc')} />
            Date Ascending
          </label>
          <label>
            <input type="radio" name="sort" value="dateDesc" checked={sortOption === 'dateDesc'} onChange={() => handleSortChange('dateDesc')} />
            Date Descending
          </label>
        </div>
        <div>
        <h4 style={{ color: '#fdfdfd', marginBottom: '10px' }}>Search By Title</h4>
        <input type="text" value={searchQuery} onChange={(e) => handleSearchChange(e.target.value)} />
      </div>
      </div>
      <button onClick={applyFilters} style={{ marginTop: '10px', padding: '5px' }}>
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
