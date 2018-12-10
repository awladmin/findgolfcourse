import React from 'react';
import Pux from '../../hoc/Pux';
import HomeLogo from '../../components/HomeLogo/HomeLogo';
import './Header.scss';
import { Link } from 'react-router-dom';


const header = (props) => (
    <Pux>
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <HomeLogo />
                </div>

                <div className="navbar-menu">
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/">Home</Link>
                        <Link className="navbar-item" to="/browse">Browse</Link>
                    </div>
                </div>
            </div>
        </nav>
    </Pux>
);

export default header;
