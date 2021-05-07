import React from 'react';
import './Input.css';

const Input = ({ atribute, handleChange, param }) =>{
    return(
        <div>
            <input 
                id={atribute.id}
                name={atribute.name}
                placeholder={atribute.placeholder}
                type={atribute.type}
                onChange={ (e) => handleChange(e.target.name, e.target.value)}
                className={ param ? 'input-error' : 'regular-style'}
            />
        </div>
    )
}

export default Input;