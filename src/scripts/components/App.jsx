import React, { useState, useEffect } from 'react';
import Home from './Home.jsx';
import SpotifyView from './SpotifyView.jsx';

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
  const { loggedIn = false, userInfo = {}, accessToken, songsList } = props;

  return (
    <html lang="en">
      <head>
        <title>WeWorship</title>
        <link href="/static/index.css" rel="stylesheet"/>
        <link href='https://fonts.googleapis.com/css?family=Alata' rel='stylesheet'/>
        <script dangerouslySetInnerHTML={{
          __html: `window.data = '${escape(JSON.stringify(props))}';`
        }} />
      </head>
      <body>
        <div id="root">
          {!loggedIn ? <Home songsList={songsList} /> : <SpotifyView userInfo={userInfo} accessToken={accessToken} />}
        </div>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  );
}

export default App;
