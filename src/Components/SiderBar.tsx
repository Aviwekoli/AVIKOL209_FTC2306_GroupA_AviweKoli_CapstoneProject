import React from 'react';
import { PiPlaylistFill } from "react-icons/pi";
import { FaShieldHeart } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";



import logo from '../assets/podcast-7477531_640.png';
import Logout from '../Components/Logout';

const Sidebar: React.FC = () => {
    return (
      <div
        style={{
          width: '200px', // Set the width of the sidebar
          height: '100vh', // Set the height of the sidebar to cover the full height
          backgroundColor: 'rgb(9, 9, 17)', // Set the background color to blue
          padding: '6px', // Add padding for content inside the sidebar
          color: 'white', // Set text color to white
          position: 'fixed',
          top: '0',
          zIndex: '1000'

        }}
      >
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-in-between',
            gap: '1rem',
            padding: '8px',
            // borderBottom: ' 3.5px solid #141416',
        }}>
            <img src={logo} alt="" style={{width: '50px', height: '50px'}} />
            <h2 style={{
                fontSize: '15px'
            }}
            >GangWaves</h2>
        </div>

        <div style ={{
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: '10px',
            borderBottom: ' 3.5px solid #141416',
            paddingTop: '10px',
            borderTop: ' 3.5px solid #141416',
        }}>
            <button style={{ cursor: 'pointer', borderRadius: '5px', display: "inline-flex", fontSize: '18px', margin: '8px', padding: '5px', backgroundColor: 'transparent', color: '#fdfdfd', border: 'none',fontFamily: 'sans-serif', textAlign: 'left', transition: 'background-color 0.9s ease'}}
                   onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#141416';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}>< FaHome style={{fontSize: '18px', marginRight: '15px'}} />
                  Home</button>

            <button style={{ cursor: 'pointer', borderRadius: '5px', display: "inline-flex", fontSize: '18px', margin: '8px', padding: '5px', backgroundColor: 'transparent', color: '#fdfdfd', border: 'none',fontFamily: 'sans-serif', textAlign: 'left', transition: 'background-color 0.9s ease'}}
                onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#141416';
                }}
                onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                }}>< FaShieldHeart style={{fontSize: '18px', marginRight: '15px'}} />
            Favorites</button>
            <button style={{cursor: 'pointer', borderRadius: '5px', display: "inline-flex", fontSize: '18px', margin: '8px', padding: '5px', backgroundColor: 'transparent', color: '#fdfdfd', border: 'none',fontFamily: 'sans-serif', textAlign: 'left', transition: 'background-color 0.9s ease'}}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#141416';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                }}>< PiPlaylistFill style={{fontSize: '18px', marginRight: '15px'}} />
            Recent Played</button>
        </div>
        
        < Logout />
      </div>
    );
  };
  
  export default Sidebar;