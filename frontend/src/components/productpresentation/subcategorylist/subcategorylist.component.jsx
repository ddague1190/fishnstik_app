import React, {useRef, useState} from 'react';
import { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { subcategories } from './subcategories';
import './subcategorylist.styles.scss';

const SubcategoryList = ({category}) => {

  const [move, setMove] = useState(0);
  const ref = useRef();

  useEffect(()=> {
      ref.current.style.transform = `translateX(${move*15}rem)`;
  }, [move])


  return (
    <div className='subcategory-section'>


          <div className='path-group'>
                <Link to='/'>Home</Link> 
                <span> > </span>
                <Link to={`/products/${category}/`}>{category}</Link>
            </div>
        <h3 className='heading--secondary'>Subcategories</h3>


        <div className='subcategory-list__container'>
        <span onClick={()=>setMove(move-1)} className='subcategory-list--panleft'><i className="fas fa-chevron-left"></i></span>
          <div className='subcategory-list__window'>
            <div className='subcategory-list' ref={ref}>
              {Object.values(subcategories[category]).map((subcategory, index)=> (

                subcategory.path ? (
                  <Link key={index} to={`/products/${category}/${subcategory.path}`} className='subcategory-item'>
                      <img className='subcategory-item__image' src={subcategory['image']} alt={`image_of_${subcategory['name']}`} />
                      <div className='subcategory-item__text'>
                        <h3>{subcategory['name']}</h3>
                      </div>
                  </Link>
                ) : (
                  <div key={index} to={`/products/${category}/${subcategory.path}`} className='subcategory-item'>
                    <img className='subcategory-item__image' src={subcategory['image']} alt={`image_of_${subcategory['name']}`} />
                    <div className='subcategory-item__text'>
                      <h3>{subcategory['name']}</h3>
                    </div>
                  </div>
                )

              ))}
            </div>
          </div>

          <span onClick={()=>setMove(move+1)} className='subcategory-list--panright'><i className="fas fa-chevron-right"></i></span>

        </div>


      <h3 className='heading--secondary'>All {category==="all" ? 'products' : category}</h3>
    </div>
    );
};


export default SubcategoryList;