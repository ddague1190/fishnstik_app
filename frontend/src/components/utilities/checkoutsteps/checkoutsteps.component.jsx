import React from 'react';
import './checkoutsteps.styles.scss';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    let value = -140;
    if(step2) value += 25;
    if(step3) value += 20;
    if(step4) value += 23;

    return (
        <div className='progress-bar__container u-margin-bottom-medium'>
                <span className='u-font-weight-light'>Login</span>
                <span className='u-font-weight-light'>Shipping</span>
                <span className='u-font-weight-light'>Options</span>
                <span className='u-font-weight-light'>PlaceOrder</span>
            <div 
            style={{
                'left': `${value}%` 
            }}
            className='progress-bar'
            >
            </div>
        </div>

    )
};

export default CheckoutSteps;
