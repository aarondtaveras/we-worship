import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import Library from './Library.jsx';

const Home = ({songList}) => {
    const [showLib, toggleShowLib] = useState(false);

    return (
        <div className="container">
            <h1>UPCSI: WeWorship!</h1>
            <h3>Our personal worship setlist tool.</h3>
            {showLib ? <Library songList={songList} /> :
                <div className="spaced-container">
                    <Button 
                        onClick={()=> {toggleShowLib(!showLib)}}
                        color="primary"
                        variant="contained"
                    >
                        library
                    </Button>
                    <Button href="/login" style={{color: 'white', textDecoration: 'none'}} color="secondary" variant="contained" >
                        spotify add
                    </Button>
                </div>
            }
        </div>
    ); 
};

Home.propTypes = {
    songList: PropTypes.array
};

Home.defaultProps = {
    songList: []
};

export default Home;
