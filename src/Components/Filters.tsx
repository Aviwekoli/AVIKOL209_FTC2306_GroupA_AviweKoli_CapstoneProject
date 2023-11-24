import React from 'react';
import filtersStyles from './filterStyles.module.css';

const Filters = ({shows}) => {

    // const showsAtoZ = (arr) => {
    //     return [...arr].sort((a, b) => a.title.localeCompare(b.title))
    // };

    console.log(shows)
    return (
        <>
        <div className={filtersStyles.container}>
            <h3>SORT BY:</h3>
            <button>A - Z</button>
            <button>Z - A</button>
            <button>Recently</button>
            <button>Least</button>
            <select>
            <option value="">All</option>
            <option value="">All</option>
            <option value="">All</option>
            <option value="">All</option>
            <option value="">All</option>
            <option value="">All</option>
            <option value="">All</option>
            <option value="">All</option>
            <option value="">All</option>
            <option value="">All</option>
            </select>
            

        </div>
        </>
    )
}

export default Filters;