// Layout.tsx
import React , { useState}from 'react';
import Sidebar from './SiderBar';
// import Navbar from './Navbar';
import AudioPlayer from './AudioPlayer';
import Audio from './Audio'

interface LayoutProps {
  isPlaying: boolean;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, token }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const handlePlay = (episodeInfo) => {
    setSelectedEpisode(episodeInfo);
  };
  const handlePlayClick = (episodeInfo) => {
    console.log('Playing episode:', episodeInfo);
    setSelectedEpisode(episodeInfo);
    setIsPlaying(true);
    // Perform any other actions related to playing the episode
  };
  console.log(selectedEpisode)

  const handleStop = () => {
    setIsPlaying(false);
    // Add any other logic you need when playback stops
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          {/* <Navbar /> */}
          {React.Children.map(children, (child) =>
            React.cloneElement(child as React.ReactElement, { handlePlayClick, isPlaying, onStop: handleStop })
          )}
        </div>
      </div>

      <Audio 
        token={token} 
        isPlaying={isPlaying} 
        onStop={handleStop} 
        audioSource={selectedEpisode ? selectedEpisode.file : undefined}
        showName={selectedEpisode && selectedEpisode.showName}
        showImage={selectedEpisode &&  selectedEpisode.image}
        episodeNumber={selectedEpisode ? selectedEpisode.episode : undefined}
        seasonNumber={selectedEpisode ? selectedEpisode.seasonNumber : undefined}
        seasonName={selectedEpisode ? selectedEpisode.showName : undefined}
      />
    </div>
  );
};

export default Layout;
