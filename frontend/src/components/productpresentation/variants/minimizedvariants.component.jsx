import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import './variants.styles.scss';
import Figure from '../../utilities/figure/figure.component';
import { cartParser } from '../../..//utils/reduxSelectors';
import { addToCart } from '../../../redux/actions/cartActions';
import VariantQuantitySelect from '../../utilities/quantityselect/variant-quantityselect.component';



const MinimizedVariantsRow = ({product, variant}) => {

    return (
        <>
        <div className='minimized-variants__details'>
            <div className='minimized-variants__topdetails'>
                <Figure icon image={variant.image} />
                <div >
                    <span className='minimized-variants__details--id'>{variant.identifier}</span> 
                    <p className='minimized-variants__details--price'> ${variant.price} ea</p>
                </div>
            </div>
        </div>
        <div className='minimized-variants__quantity'>
            {variant.countInStock > 0 ? (
            
                <VariantQuantitySelect product={product} variant = {variant} />
                ) : <h4>Out of stock</h4> }
        </div>

        <div>
            price
        </div>
        </>
    )
}

const MinimizedVariants = ({product, className}) => {

  return (
    <table className={`${className} minimized-variants`}>
        <thead>
            <th>Details</th>
            <th>Add to cart</th>
            <th>Subtotal</th>
        </thead>
        <tbody>
            {product.variants.map((variant, index) => (
                <MinimizedVariantsRow product={product} variant={variant} key={index} />
            ))}
        </tbody>

    </table>
      
  );
};


export default MinimizedVariants;