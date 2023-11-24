import React, { useState, useEffect } from 'react';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Show from './Pages/Show';
import { Routes, Route } from 'react-router-dom';
 
const App: React.FC = () => {

  const [ token, setToken ] = useState<boolean>(false);

  if(token) {
    sessionStorage.setItem('token', JSON.stringify(token));
  }

useEffect(() => {
  if(sessionStorage.getItem('token')){
    const data = JSON.parse(sessionStorage.getItem('token'));
    setToken(data)
  }
}, []);

  return (
    <>
      <Routes>
        {/* <Route path={'/'} element={<Login setToken={setToken} />}/> */}
        <Route path={'/'} element={<Home />}/>
        <Route path={'/signup'} element={<Signup />}/>
        {/* {token? <Route path={'/home'} element={<Home token={token}/>}/> : ""} */}
        <Route path={'/show/:showId'} element={<Show />} />
      </Routes>
    </>
  )
}
export default App;