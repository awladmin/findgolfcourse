import React, { Component } from 'react';
//import axios from 'axios';
import Pux from '../../hoc/Pux';
import './SignUp.scss';
//import PropTypes from 'prop-types';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
//import decodeHtml, {stripTags} from '../../utils/utils';
//import firebase from '../../Firebase.js';


class SignUp extends Component {

    state = {
        signUp : {}
    }

    render() {


        return (
            <Pux>
                <BreadCrumbs title="Sign Up" />

                <h1 className="title is-3">Sign Up</h1>

                <form>
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" type="email" placeholder="Email" />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                            <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="password" placeholder="Password" />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <button className="button is-success">
                                Sign Up
                            </button>
                        </p>
                    </div>
                </form>
                    
            </Pux>
        );
    }
}


export default SignUp;
