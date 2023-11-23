import React from 'react';
import withLoading from '../Components/WithLoading';

const Favorites: React.FC = ({favourite}) => {

    const [fav, setFav] = useState([]);
    
    if(favorites){
        setFav(favourite)
    }
}

export default withLoading(Favorites);
