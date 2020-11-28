import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import Playlist from './Playlist.jsx';
// import Track from './Track';

const User = (props) => {
    const [playlists, setPlaylists] = useState([]);
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
            console.log(playlists);
        });
    }

    return (
        <div className="user-view">
            {`Welcome ${userInfo.display_name}!`}
            <Button onClick={fetchPlaylists} color="primary">
                Click here to show your playlists!
            </Button>
            {playlists && <Playlist items={playlists} />} 
        </div>
    );
};

export default User;