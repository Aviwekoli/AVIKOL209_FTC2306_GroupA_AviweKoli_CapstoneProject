import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
 
const App = () => {

  // const [ token, setToken] = useState(()=>{
  //   const localValue = sessionStorage.getItem('TOKEN');
  //   if (localValue == null) return null;
  //   return JSON.parse(localValue)
  // });

  // useEffect(() => {
  //   sessionStorage.setItem('TOKEN', JSON.stringify(token))
  // }, [token]);

  const [ token, setToken ] = useState(false);

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
        <Route path={'/'} element={<Login setToken={setToken} />}/>
        <Route path={'/signup'} element={<Signup />}/>
        {token? <Route path={'/home'} element={<Home token={token}/>}/> : ""}
      </Routes>
    </>
  )
}
export default App;
