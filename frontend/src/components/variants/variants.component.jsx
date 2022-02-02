import React, {useState} from 'react';
import {useNavigate } from 'react-router-dom';

import './variants.styles.scss';
import Figure from '../figure/figure.component';

const Variants = ({product, className}) => {
    const navigate = useNavigate()
    const [qty, setQty] = useState(1);
    const addToCartHandler = (variantId) => {
        navigate(`/cart/${product._id}?qty=${qty}&variant=${variantId}`)
    }

  return (
    <table className={`${className} variants`}>
        <thead>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Add to Cart</th>
        </thead>
        <tbody>
            {product.variants.map((variant, index) => (
                <tr key={index}>
                    <td className='variants__image'><Figure image={variant.image}/></td>
                    <td className='variants__name' >{variant.identifier}</td>
                    <td className='variants__price'>{variant.price}</td>
                    <td className='variants__description'>{variant.description}</td>
                    <td className='variants__quantity'>
                    <div>
                        {variant.countInStock > 0 ? (
                        <form  className='u-center-text' value={qty} onChange={(e) => setQty(e.target.value)}>
                            <select className='cartform__select u-center-text' value={qty}>
                            {                           
                                [...Array(variant.countInStock).keys()].map((x) => (
                                    <option key={x+1} value={x+1}>
                                        {x + 1}
                                    </option>
                            ))
                            }
                            </select>
                        </form>
                        ) : <h4>Out of stock</h4> }
                    </div>
                    </td>
                    <td className='variants__addtocart' onClick={()=>addToCartHandler(variant._id)}>
                    <i class="fas fa-shopping-cart"></i>
                    </td>
                </tr>
            ))}
        </tbody>

    </table>
      
  );
};


export default Variants;