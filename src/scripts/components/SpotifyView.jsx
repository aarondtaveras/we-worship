import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import Playlist from './Playlist.jsx';
// import Track from './Track';

const SpotifyView = (props) => {
    const [playlists, setPlaylists] = useState([]);
    // const [showTracks, setShowTracks] = useState(false);
    const { userInfo = {}, accessToken } = props;

    const fetchPlaylists = () => {
        fetch(`https://api.spotify.com/v1/users/${userInfo.id}/playlists`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        })
        .then(res => res.json())
        .then((result) => {
            setPlaylists(result.items);
        });
    }

    return (
        <div className="user-view">
            {`Welcome ${userInfo.display_name}!`}
            <Button onClick={fetchPlaylists} color="primary">
                Click here to show your playlists!
            </Button>
            <a className="logout" href="https://accounts.spotify.com/en/logout">
                CLICK TO LOGOUT
            </a>
            {playlists && 
                playlists.map((p) => {
                   return <Playlist userInfo={userInfo} accessToken={accessToken} playlist={p} />
                })
            } 
        </div>
    );
};

export default SpotifyView;