import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import Track from './Track.jsx';

const Playlist = (props) => {
    const { playlist, accessToken, userInfo } = props;
    const [tracks, setTracks] = useState([]);

    const fetchTracks = () => {
        fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        })
        .then(res => res.json())
        .then((result) => {
            setTracks(result.items);
        });
    };

    return (
        <div className="playlist-container">
            <Button onClick={fetchTracks} key={playlist.id} className="playlist" variant="outlined" color="secondary">
                {`${playlist.name}: ${playlist.tracks.total}`}
            </Button>
            {tracks.length && tracks.map((track) => {
                return <Track userInfo={userInfo} accessToken={accessToken} track={track} />
            })}
        </div>
    );
};

export default Playlist;