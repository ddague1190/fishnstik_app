import React from 'react'
import Rating from '../rating/rating.component.jsx';
import { Link } from 'react-router-dom'
import Figure from '../figure/figure.component';
import './product.styles.scss'


function Product({ product }) { 
    return (
        <Link className='productcard' to={`/product/${product._id}`}>
            <Figure image={product.image} alt={product.name} height='190px'/>
            <p className='productcard__name'>
                {product.name}
            </p>
        </Link>
    )
}

export default Product
