import React from 'react';
import searchStyles from './searchStyles.module.css';

const Search: React.FC= () => {

    return (
        <div class={searchStyles.search}>
            <input placeholder="Search..." type="text" />
            <button type="submit">Go</button>
        </div>

    )
}

export default Search;