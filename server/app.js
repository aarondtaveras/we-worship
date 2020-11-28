const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
const cors = require('cors');

const app = express();
const login = require('../src/controllers/login');

app.use(express.static('dist'));
app.use(cors);
app.use(login);
app.use(bodyParser);
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));