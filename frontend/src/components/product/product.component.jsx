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
                    <span className='productcard__details--name'>{product.name.slice(0,30)}</span>
                    <div className='productcard__details--panel'>
                        <span className='catchphrase'>{product.catchPhrase}</span>
                        <div className='brand'>
                            <div>Made by</div> 
                            <div>{product.brand}</div>
                        </div>
                    </div>
                </div>
                <a href={`/product/${product._id}`} className='productcard__button'>More info</a>
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
