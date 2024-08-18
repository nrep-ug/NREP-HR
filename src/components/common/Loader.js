// src/components/common/Loader.js

import React from 'react';
import { Spinner } from 'react-bootstrap';
import '../../assets/styles/Loader.css';

const Loader = () => {
    return (
        <div className="loader-container">
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    );
};

export default Loader;
