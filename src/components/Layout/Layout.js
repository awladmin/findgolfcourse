import React from 'react';
import Header from '../Header/Header';
import Pux from '../../hoc/Pux';
import './Layout.scss';

const layout = (props) => (
    <Pux>
        <Header />
        <section className="section section--main">
            <main>
                <div className="container">
                    {props.children}
                </div>
            </main>
        </section>
    </Pux>
);

export default layout;