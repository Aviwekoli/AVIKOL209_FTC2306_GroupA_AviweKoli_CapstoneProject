// Layout.tsx
import React from 'react';
import Sidebar from './SiderBar';
import Navbar from './Navbar';
import AudioPlayer from './AudioPlayer';

interface LayoutProps {
  isPlaying: boolean;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ isPlaying, children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Navbar />
          {children}
        </div>
      </div>
      {isPlaying && <AudioPlayer />}
    </div>
  );
};

export default Layout;
