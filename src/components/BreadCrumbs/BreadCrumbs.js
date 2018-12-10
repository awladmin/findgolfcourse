import React from 'react';
import { Link } from 'react-router-dom';


const breadcrumbs = (props) => (
    <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/browse">Browse</Link></li>
            <li className="is-active"><Link to="/">{props.title}</Link></li>
        </ul>
    </nav>
);
  

export default breadcrumbs;
