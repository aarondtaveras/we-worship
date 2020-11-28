import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import Playlist from './Playlist.jsx';
// import Track from './Track';

const User = (props) => {
    const [playlists, setPlaylists] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const fetchPlaylists = () => {
        fetch("https://api.spotify.com/v1/me/playlists")
        .then(res => res.json())
        .then((result) => {
            setPlaylists(result.items);
        });
    }

    const fetchUserData = () => {
        console.log('fetching user data...');
        fetch("https://api.spotify.com/v1/me")
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            setUserInfo({
                name: result.display_name,
                id: result.id
            });
        });
    }

    const renderPlaylists = () => {
        fetchPlaylists();
        return <Playlist items={playlists} />;
    };
    
    useEffect(fetchUserData, []);

    return (
        <div className="user-view">
            {`Welcome ${userInfo.name}!`}
            <Button onClick={renderPlaylists} color="primary">
                Click here to show your playlists!
            </Button>
        </div>
    );
};

export default User;