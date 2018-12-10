import React from 'react';
import './HomeLogo.scss';
import { Link } from 'react-router-dom';

const homelogo = (props) => (
    <div className="homelogo">
        <h1 className="homelogo__header">
            <Link to="/">
            <span className="homelogo__header-text homelogo__header-text--first">UK </span>
            <span className="homelogo__header-text homelogo__header-text--second">Golf </span>
            <span className="homelogo__header-text homelogo__header-text--third">Course </span>
            <span className="homelogo__header-text homelogo__header-text--fourth">Finder</span>
            </Link>
        </h1>
    </div>
);

export default homelogo;