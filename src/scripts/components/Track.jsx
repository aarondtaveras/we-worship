import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

const Track = (props) => {
    const { items } = props;
    

    return (
        <div className="track-container">
            {items.map((item) => {
                return (
                    <Button key={item.id} className="playlist" variant="outlined" color="secondary" onClick={fetchTracks}>
                        {`Title: ${item.name} Num Songs: ${item.tracks.total}`}
                    </Button>
                );
            })}
        </div>
    );
};

export default Track;