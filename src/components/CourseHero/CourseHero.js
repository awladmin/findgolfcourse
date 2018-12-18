import React from 'react';
import './CourseHero.scss';
import decodeHtml from '../../utils/utils';

const coursecard = (props) => {
    
    let address = '';
    if(props.address1) address += props.address1;
    if(props.town) address += ', '+props.town;
    if(props.county) address += ', '+props.county;
    if(props.postcode) address += ', '+props.postcode;
    if(props.country) address += ', '+props.country;

    return (
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
                        <p className="subtitle is-6">{address}</p>
                        {props.phone ? <p className="subtitle is-6">Phone: {props.phone}</p> : null}
                        {props.website ? <p className="subtitle is-6"><a href={(props.website.indexOf(/http/) !== -1) ? props.website : 'http://' + props.website}>Visit Website</a></p> : null}
                    </div>                                                        
                </div>
            </div>
        </div>                                           
    </div>
);
}
  

export default coursecard;
