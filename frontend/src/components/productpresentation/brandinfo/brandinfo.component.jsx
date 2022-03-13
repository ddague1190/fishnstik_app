import React from "react";
import { brandinfo } from "./brandinfo";
import "./brandinfo.styles.scss";
import { Link } from "react-router-dom";

const BrandInfo = ({ brand }) => {
  return (
    <>
      <div className='path-group'>
        <Link to='/'>Home</Link>
        <span> > </span>
        <Link to={`/brands/${brand}/`}>{brand}</Link>
      </div>

      <div className='brand-info'>
        <span className='brand-info__description'>{brandinfo[brand]}</span>
      </div>
    </>
  );
};

export default BrandInfo;
