import React from 'react';
import { Button } from '@material-ui/core';

const Login = () => {

    return (
        <div className="login-container">
            <Button color="primary" variant="contained" > 
                <a href="/login">
                    Click here to log in to Spotify
                </a>
            </Button> 
        </div>
    ); 
};

export default Login;
