import React, { useState, useEffect } from 'react';
import Login from './Login.jsx';
import User from './User.jsx';

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

function App(props) {
  const { loggedIn } = props;

  return (
    <html lang="en">
      <head>
        <title>WeWorship</title>
        <script src="/static/bundle.js"></script>
      </head>
      <body>
        <div id="root">
          {!loggedIn ? <Login /> : <User/>}
        </div>
      </body>
    </html>
  );
}

export default App;
