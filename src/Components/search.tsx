import React, { useState, } from 'react';
import Fuse from 'fuse.js';
import searchStyles from './searchStyles.module.css'

interface SearchProps {
    shows: showsInfo[];
    updateShows: (sortedShows: showsInfo[]) => void;
}

const Search: React.FC<SearchProps> = ({ shows, updateShows }) => {
  const [searchQuery, setSearchQuery] = useState('');

 const fuseOptions = {
    keys: ['title', 'description'],
  };

  const fuse = new Fuse(shows, fuseOptions);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const searchResults = fuse.search(query);

    updateShows(searchResults.map((result) => result.item));
  };

    return (
        <div className={searchStyles.search}>
            <input placeholder="Search..." type="text"
            value={searchQuery}
            onChange={handleSearchChange} />
        </div>

    )
}
export default Search;