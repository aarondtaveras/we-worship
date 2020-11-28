import React, { useState, useEffect } from 'react';

const Playlist = (props) => {
    const { items } = props;

    return (
        <div className="playlist-container">
            {items.map((item) => {
                return (
                    <div key={item.id} className="playlist">
                        {item.name}
                    </div>
                );
            })}
        </div>
    );
};

export default Playlist;