import controller from './routes/index';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const os = require('os');
const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true  
})
.then(() => console.log('MongoDB connected!'))
.catch((err)=> console.log(err));

app.use('/static', express.static('public'));
app.use('/', controller);

app.listen(process.env.PORT || 3000, () => console.log(`Listening on port ${process.env.PORT || 3000}!`));
