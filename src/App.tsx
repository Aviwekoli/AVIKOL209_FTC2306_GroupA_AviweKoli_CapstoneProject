import React, { useState, useEffect } from 'react';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Show from './Pages/Show';
import AudioPlayer from './Components/AudioPlayer'
import { Routes, Route } from 'react-router-dom';

import Layout from './Components/Layout';
 
const App: React.FC = () => {

  const [isPlaying, setIsPlaying] = useState(false);


  const handlePlay = () => {
   setIsPlaying(true);
 };

 const handleStop = () => {
   setIsPlaying(false);
 };

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
      <Route path={'/'} element={<Login setToken={setToken} />} />
      <Route path={'/signup'} element={<Signup />} />
      {/* {token ? <Route path={'/home'} element={<Home token={token} onPlay={handlePlay} onStop={handleStop}/>} /> : ''} */}
      {token && (
        <Route
          path={'/home'}
          element={
            <Layout isPlaying={isPlaying}>
              <Home token={token} onPlay={handlePlay} onStop={handleStop} />
            </Layout>
          }
        />
      )}
      <Route
        path={'/show/:showId'}
        element={
          <Layout isPlaying={isPlaying}>
            <Show onPlay={handlePlay} onStop={handleStop} isPlaying={isPlaying} />
          </Layout>
        }
      />
    </Routes>
    {isPlaying && <AudioPlayer onStop={handleStop} />}
    {/* < Layout /> */}
  </>
);
}
export default App;

// return (
//   <>
//     <Routes>
//       <Route path={'/'} element={<Login setToken={setToken} />}/>
//       {/* <Route path={'/'} element={<Home />}/> */}
//       <Route path={'/signup'} element={<Signup />}/>
//       {token? <Route path={'/home'} element={<Home token={token}/>}/> : ""}
//       <Route path={'/show/:showId'} element={<Show />} />
//     </Routes>
//   </>
// )