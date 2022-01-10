import React, {useState} from 'react';

const AddressBox = ({index, input, highlighted, selectedAddress}) => {
    const {name, address, apartment, city, state, postalCode, phone} = input

    return (
    <ul  
    className={`${highlighted ? 'address-box-highlight' : ''} address-box`}
    onClick={()=> {
        selectedAddress(input, index)
    }}>
        <li>{name}</li>
        <li>{address}</li>
        {apartment && <li>{apartment}</li>} 
        <li>{city}, {state} {postalCode}</li> 
        {phone && <li>Phone: {phone}</li>} 
    </ul>
    )
}

export default AddressBox;