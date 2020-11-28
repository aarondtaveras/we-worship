import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

const serverProps = JSON.parse(unescape(window.data));

ReactDOM.hydrate(
    <App {...serverProps} />, document.getElementById('root')
);
