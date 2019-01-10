import React from 'react';
import './Input.scss';

const input = (props) => {
    let inputElement = null;
    
    switch ( props.inputtype ) {
        case( 'input' ):
            inputElement = <input {...props} />
            break;
        case ( 'textarea' ):
            inputElement = <textarea {...props}></textarea>
            break;
        default:
            inputElement = <input {...props} />
    }

    return (
        <div className="field">
            <label htmlFor={props.id} className="label">{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;