import React from 'react';
import './CourseHero.scss';
import decodeHtml from '../../utils/utils';

const coursecard = (props) => (
    <div className="column">                                          
        <div className="card">
            <div className="card-image">
                <figure className="image is-4by3">
                    {props.imageHtml}
                </figure>
            </div>
            <div className="card-content">
                <div className="media">                                                    
                    <div className="media-content">
                        <p className="title is-4">{decodeHtml(props.title)}</p>
                        <p className="subtitle is-6">{(props.county) ? props.county : props.town}</p>
                    </div>                                                        
                </div>
            </div>
        </div>                                           
    </div>
);
  

export default coursecard;
