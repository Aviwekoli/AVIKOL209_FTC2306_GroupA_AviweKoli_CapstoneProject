import React from 'react';
import withLoading from '../Components/WithLoading';

const Playlist: React.FC = () => {

    return (
        <>
           <h1 style={{color: 'white', textAlign: 'center', paddingLeft: '300px'}}>Recently Played Episodes</h1>
        </>
    )
}

export default withLoading(Playlist);