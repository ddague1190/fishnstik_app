import React from "react";
import "./productscreenbanner.styles.scss";

const VerticalProductScreenBanner = ({ className }) => {
  return (
    <div className={`verticalproductscreenbanner u-box-shadow ${className}`}>
      <img
        className='verticalproductscreenbanner__image'
        src='https://fishnwirepictures.s3.amazonaws.com/aftcoharness.jpeg'
      />
      <img
        className='verticalproductscreenbanner__logo'
        src='https://fishnwirepictures.s3.amazonaws.com/aftcologo.png'
      />
      <div className='verticalproductscreenbanner__message'>
        Check our storeroom for discounts on AFTCO products
      </div>
    </div>
  );
};

export default VerticalProductScreenBanner;
