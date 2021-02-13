import App from '../../src/scripts/components/App.jsx';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import login from './login';
import songs from './songs';

const express = require('express');
const index = express.Router();

index.get('/', (req, res) => {
    res.send(ReactDOMServer.renderToString(<App/>));
});

index.use('/', [login, songs]);

export default index;
