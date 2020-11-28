import React, { useState, useEffect } from 'react';
import Track from './Track';
import Playlist from './Playlist';
import Login from './Login';
import logo from './logo.svg';
import './App.css';

/*
  flow: log user in
  display current playlists on user's account
  select worship playlist
  display tracks: have search function/filters
  tapping the song
    - display info
    - play
    - X icon
  on play
    - open play controls
  on info tap, open song info (modal??). modal has edit button
    - display (maybe OG key of song), and user edited key
    - instrument setup
      - instruments have name, icon, and text box for the person who's playing it
    - add notes section for song - chorus 2x, verse, bridge, etc
  
  that's it for now boyo!

*/ 

// Main app

function App() {
  const [playlists, getPlaylists] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const fetchPlaylists = () => {
    if (loggedIn) {
      fetch("https://api.spotify.com/v1/me/playlists")
      .then(res => res.json())
      .then((result) => {
        console.log(result);
      });
    }
  }
  
  const renderPlaylists = () => {
    console.log('hello');
  };

  useEffect(fetchPlaylists, []);

  return (
    <div className="App">
      <Login />
      <div className="playlist-container">
      </div>
    </div>
  );
}

export default App;
