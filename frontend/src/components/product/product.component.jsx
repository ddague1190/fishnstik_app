import React from 'react'
import Rating from '../rating/rating.component.jsx';
import { Link } from 'react-router-dom'
import Figure from '../figure/figure.component';
import './product.styles.scss'


function Product({ product }) { 
    console.log(product)
    return (
            <div className='productcard'>
                <div className='productcard__image'>
                    <img src={product.image} alt={product.name} />
                </div>
                <div className='productcard__details'>
                    <span className='productcard__details--name'>{product.name.slice(0,15)}</span>
                    <div className='productcard__details--panel'>
                        <span className='catchphrase'>{product.catchPhrase}</span>
                        <span className='leftpanel'>MFG</span>
                        <span className='leftpanel'>INFO</span>
                        <span className='rightpanel brand'>{product.brand}</span>
                        <span className='rightpanel description'>{product.description}</span>
                    </div>
                </div>
            </div>

        // <div classname='product_card'>
        //     <div className='product_card__image'>
        //         {/* <img src={product.image} alt={product.name} /> */}
        //     </div>
        //     <div className='product_card__details'>
        //         {/* <span className='product_card__details--name'>{product.name}</span>
        //         <span className='product_card__details--catchphrase'>{product.catchphrase}</span> */}
        //     </div>
        // </div>
    )
}

export default Product
