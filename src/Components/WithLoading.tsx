import React, { useState, useEffect } from 'react';
import Loading from './Loading.tsx';


const withLoading: React.FC = (WrappedComponent) => {
  return (props) => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      const fakeAsyncOperation = () => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      };

      fakeAsyncOperation();
    }, []);

    return loading? < Loading />  : <WrappedComponent {...props} />;
  };
};
export default withLoading;