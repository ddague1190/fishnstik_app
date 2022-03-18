import React from 'react';

const HorizontalProductScreenBanner = ({className}) => {
  return <div className={`horizontalproductscreenbanner ${className}`}>

  <img className='horizontalproductscreenbanner__image' src='https://fishnwirepictures.s3.amazonaws.com/james-wheeler-HJhGcU_IbsQ-unsplash.jpg' />

  <div className='horizontalproductscreenbanner__title'>
      <span>Orders over</span> <span>$99</span> <h1>ship free</h1>
  </div>

  </div>;
};

export default HorizontalProductScreenBanner;