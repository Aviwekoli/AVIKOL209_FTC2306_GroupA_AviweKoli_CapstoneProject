import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Show from './Pages/Show';
import Favorites from './Pages/Favorites';
import Playlist from './Pages/RecentlyPlayed';
import Landing from './Pages/Landing';


import Layout from './Components/Layout';
 
const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);


  const handlePlay = () => {
   setIsPlaying(true);
 };

 const handleStop = () => {
   setIsPlaying(false);
 };

 const [token, setToken] = useState<boolean | null>(null);

try {
   useEffect(() => {
     if (token) {
       sessionStorage.setItem('token', JSON.stringify(token));
     }
   }, [token]);
 } catch (error) {
   console.error('Error while setting token:', error);
 }
 
 useEffect(() => {
   try {
     const storedToken = sessionStorage.getItem('token');
     if (storedToken) {
       const data = JSON.parse(storedToken);
       setToken(data);
     }
   } catch (error) {
     console.error('Error while retrieving token:', error);
   }
 }, []);

 useEffect(() => {
   try {
     const storedToken = sessionStorage.getItem('token');
     if (storedToken && !JSON.parse(storedToken)) {
       console.error('Error: Invalid JSON format for stored token.');
       sessionStorage.removeItem('token');
       setToken(null);
     }
   } catch (error) {
     console.error('Error while parsing stored token JSON:', error);
   }
 }, []);

return (
  <>
    <Routes>
      <Route path={'/'} element= {< Landing/>} />
      <Route path={'/login'} element={<Login setToken={setToken} />} />
      <Route path={'/signup'} element={<Signup />} />
      <Route 
          path={'/favorites'} 
          element={
            <Layout>
              <Favorites />
            </Layout>
          }
      />
      <Route 
          path={'/playlist'} 
          element={
            <Layout>
              <Playlist />
            </Layout>
          }
      />
      {token && (
        <Route
          path={'/home'}
          element={
            (<Layout isPlaying={isPlaying} token={token}> 
              <Home token={token} onPlay={handlePlay} onStop={handleStop} />
            </Layout>)
          }
        />
      )}
      <Route
        path={'/show/:showId'}
        element={
          <Layout isPlaying={isPlaying}>
            <Show />
          </Layout>
        }
      />
    </Routes>
    {isPlaying && <AudioPlayer onStop={handleStop} />}
  </>
);
}
export default App;