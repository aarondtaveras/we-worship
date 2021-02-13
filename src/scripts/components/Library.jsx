import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import DisplayTable from './DisplayTable.jsx';
import { Button, Modal, Paper, TextField } from '@material-ui/core';

const Library = ({songList}) => {
    const [songs, updateSongs] = useState(songList);
    const [open, setOpen] = useState(false);
    const [customState, setCustomState] = useState({});

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { target } = e;
        const name = target.id;
        const value = target.value;
        setCustomState({
            ...customState,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        console.log('submitting form with this data: ', customState);
        e.preventDefault();
        handleClose();
        fetch('/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customState)
        })
        .then(()=> {
            getAllSongs();
        })
    }

    const getAllSongs = () => {
        fetch('/songs')
        .then(res => res.json())
        .then((result) => {
            updateSongs(result);
        });
    };

    useEffect(getAllSongs, []);

    return (
        <div>
            <h1>Welcome to your library!</h1>
            <div className="spaced-container" style={{justifyContent: 'space-between'}}>
                <Button href="/login" style={{color: 'white', textDecoration: 'none'}} color="secondary" variant="contained" >
                    spotify add
                </Button>
                <Button onClick={handleOpen} color="primary" variant="contained">
                    add
                </Button>
            </div>
            <Modal open={open} onClose={handleClose} aria-labelledby="add-song-modal">
                <form method="post" onSubmit={handleSubmit} className="modal">
                    <TextField className="add-song-field" id="song-title" onChange={handleChange} label="Title"/>
                    <TextField className="add-song-field" id="song-author" onChange={handleChange} label="Author"/>
                    <TextField className="add-song-field" id="song-key" onChange={handleChange} label="Key"/>
                    <TextField className="add-song-field" id="song-vocalist" onChange={handleChange} label="Vocalist"/>
                    <TextField className="add-song-field" id="song-notes" onChange={handleChange} multiline rowsMax={6} helperText="Do chorus 3x, drum solo, whatever else!" label="Notes"/>
                    <input className="submit-btn" type="submit" value="SUBMIT"/>
                </form>
            </Modal>
            {songs && <DisplayTable className={`song-table`} type={'song'} data={songs} />}
        </div>
    );
};

Library.propTypes = {
    songList: PropTypes.array
};

Library.defaultProps = {
    songList: []
}

export default Library;
