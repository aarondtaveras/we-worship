import App from '../../src/scripts/components/App.jsx';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import SongSchema from '../models/Song';

const express = require('express');
const songs = express.Router();
const mongoose = require('mongoose');
const SongModel = mongoose.model('Song', SongSchema);
    
const filterSongs = async (filter) => {
    console.log('filtering song', filter);
};

songs.get('/songs', async (req, res, next) => {
    const songs = await SongModel.find({}, (err) => {
        if (err) console.error(err);
    });
    res.json(songs);
});

songs.post('/add', async (req, res, next) => {
    if (req.body) {
        const { 'song-title': title, 'song-author': originalAuthor, 'song-key': userKey, 'song-vocalist': vocalist, 'song-notes': notes } = req.body;
        SongModel.create({ title, originalAuthor, userKey, vocalist, notes}, (err) => {
            if (err) {
                console.log('Error saving song', err);
            }
        });
    }
    res.sendStatus(200);
});

export default songs;