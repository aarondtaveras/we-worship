import App from '../../src/scripts/components/App.jsx';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const express = require('express');
const login = express.Router();

// Documentation here: https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/app.js
const querystring = require('querystring');
const request = require('request');
const cookieParser = require('cookie-parser');

const stateKey = 'spotify_auth_state';
const redirect_uri = 'http://localhost:3000/auth';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
let generateRandomString = function(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

login.get('/login', function(req, res) {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);
  
    // your application requests authorization
    let scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: process.env.SPOTIFY_ID,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  });
  
login.get('/auth', function(req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter
  
    let code = req.query.code || null;
    let state = req.query.state || null;
  
    if (state === null) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_ID + ':' + process.env.SPOTIFY_SECRET).toString('base64'))
        },
        json: true
      };
  
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
  
          let access_token = body.access_token,
              refresh_token = body.refresh_token;
  
          let options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };
          
          // use the access token to access the Spotify Web API
          request.get(options, function(error, response, body) {
            res.send(ReactDOMServer.renderToString(<App accessToken={access_token} loggedIn={true} userInfo={body}/>));
          });
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }
  });
  
login.get('/refresh_token', function(req, res) {
  
    // requesting access token from refresh token
    let refresh_token = req.query.refresh_token;
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_ID + ':' + process.env.SPOTIFY_SECRET).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        let access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
  });

  export default login;
