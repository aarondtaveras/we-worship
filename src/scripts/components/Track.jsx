import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

const KEY_MAP = {
    0: 'C',
    1: 'C#',
    2: 'D',
    3: 'D#',
    4: 'E',
    5: 'F',
    6: 'F#',
    7: 'G',
    8: 'G#',
    9: 'A',
    10: 'A#',
    11: 'B',
};

const Track = ({ track, accessToken, userInfo, fromSpotify }) => {
    const [audioAnalysis, setAudioAnalysis] = useState({});

    const fetchAudioAnalysis = () => {
        fetch(`https://api.spotify.com/v1/audio-analysis/${track.id}`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        })
        .then(res => res.json())
        .then((result) => {
            setAudioAnalysis(result);
        });
    };

    useEffect(fetchAudioAnalysis, []);

    return (
        <div className="track-container">
            <Button key={track.id} className="track" variant="outlined" color="secondary" >
                { `${track.name} Key: ${KEY_MAP[audioAnalysis.section.key]}`}
            </Button>
        </div>
    );
};

export default Track;