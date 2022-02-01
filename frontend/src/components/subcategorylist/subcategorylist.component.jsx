import React from 'react';
import {Link} from 'react-router-dom';
import { subcategories } from './subcategories';
import './subcategorylist.styles.scss';

const SubcategoryList = ({category}) => {



  return (
    <div className='subcategory-section'>
        <h3><Link to='/'>Home   >   </Link>{category}</h3>
        <h3 className='heading--secondary'>Subcategories</h3>
        <div className='subcategory-list'>
      {subcategories[category].map((subcategory)=> (
        <div className='subcategory-item'>
            <img className='subcategory-item__image' src={subcategory['image']} alt={`image_of_${subcategory['name']}`} />
            <div className='subcategory-item__text'>
              <h3>{subcategory['name']}</h3>
              <span>Learn more</span>
            </div>
        </div>
      ))}
      </div>

      <h3 className='heading--secondary'>All {category}</h3>
    </div>
    );
};


export default SubcategoryList;