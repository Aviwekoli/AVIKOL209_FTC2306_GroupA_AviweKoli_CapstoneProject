import React from 'react';
import Search from './search'

const Navbar = ({shows, updateShows}) => {
    return (
        <div
          style={{
            width: '100%', // Set the width to occupy the full width
            backgroundColor: 'rgb(9, 9, 17)', // Set the background color to blue
            padding: '5px', // Add padding for content inside the search bar
            color: 'white',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between', // Set text color to white
            position: 'fixed',
            top: '0',
            zIndex: '999',
            paddingLeft: '5px'
          }}
        >
          {/* Search bar content goes here */}
          < Search shows={shows} updateShows={updateShows} />
          {/* Add your search bar content here */}
        </div>
      );
};

export default Navbar;