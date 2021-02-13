const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    title: String,
    originalAuthor: String,
    userKey: String,
    vocalist: String,
    notes: String
});

export default SongSchema;
