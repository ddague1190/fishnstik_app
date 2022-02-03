import React from 'react';
import { subcategories } from './subcategories';
import { Link } from 'react-router-dom';

const SubcategoryInfo = ({category, subcategory}) => {
    const {name, description, media} = subcategories[category][subcategory]
  return ( 

    <>

            <div className='path-group'>
                <Link to='/'>Home</Link> 
                <span> > </span>
                <Link to={`/products/${category}/`}>{category}</Link>
                <span> > </span>
                <Link to={`/products/${category}/${subcategory}/`}>{subcategory}</Link>
            </div>


    

    <div className='subcategory-info'>
        <span className='subcategory-info__description'>{description}</span>


    </div>
    </>
  );
};

export default SubcategoryInfo;