// import React from 'react';
import Search from './search';

interface NavbarProps {
  shows: object;
  updateShows: (shows: object) => void;
    
}

const Navbar:React.FC<NavbarProps> = ({shows, updateShows}) => {
    return (
        <div
          style={{
            width: '100%', 
            backgroundColor: 'rgb(9, 9, 17)', 
            padding: '5px',
            color: 'white',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'fixed',
            top: '0',
            zIndex: '999',
            paddingLeft: '5px'
          }}
        >
          < Search shows={shows} updateShows={updateShows} />
        </div>
      );
};

export default Navbar;