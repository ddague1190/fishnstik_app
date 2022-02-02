import React from 'react';
import {Link} from 'react-router-dom';
import { subcategories } from './subcategories';
import './subcategorylist.styles.scss';

const SubcategoryList = ({category}) => {



  return (
    <div className='subcategory-section'>


          <div className='path-group'>
                <Link to='/'>Home</Link> 
                <span> > </span>
                <Link to={`/products/${category}/`}>{category}</Link>
            </div>
        <h3 className='heading--secondary'>Subcategories</h3>



        
        <div className='subcategory-list'>
      {Object.values(subcategories[category]).map((subcategory, index)=> (
        <Link key={index} to={`/products/${category}/${subcategory.path}`} className='subcategory-item'>
            <img className='subcategory-item__image' src={subcategory['image']} alt={`image_of_${subcategory['name']}`} />
            <div className='subcategory-item__text'>
              <h3>{subcategory['name']}</h3>
            </div>
        </Link>
      ))}
      </div>

      <h3 className='heading--secondary'>All {category}</h3>
    </div>
    );
};


export default SubcategoryList;