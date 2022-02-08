import React, {useState} from 'react';
import './addressbox.styles.scss';

const AddressBox = ({index, input, highlighted, selectedAddress, className}) => {

    if(!input) return '';

    const {name, address, apartment, city, state, postalCode, phone} = input

    return (
        <ul  
        className={ `${className} ${highlighted ? 'addressbox--highlighted' : ''} addressbox`}
        onClick={()=>selectedAddress(input, index)}
        >
            <li>{name}</li>
            <li>{address}</li>
            {apartment && <li>{apartment}</li>} 
            <li>{city}, {state} {postalCode}</li> 
            {phone && <li>Phone: {phone}</li>} 
        </ul>
    )
}

export default AddressBox;