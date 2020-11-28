import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

const Playlist = (props) => {
    const { items } = props;

    return (
        <div className="playlist-container">
            {items.map((item) => {
                return (
                    <Button key={item.id} className="playlist" variant="outlined" color="secondary">
                        {`Title: ${item.name} Num Songs: ${item.tracks.total}`}
                    </Button>
                );
            })}
        </div>
    );
};

export default Playlist;