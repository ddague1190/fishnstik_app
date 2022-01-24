import React from 'react'
import { useNavigate } from 'react-router-dom'
import './product.styles.scss'



const Product = ({ product }) => { 

    const navigate = useNavigate();
    const onProductCardClick = () => {
        navigate(`/product/${product._id}`)
    }

    return (
            <div className='productcard'>
                <div className='productcard__image'>
                    <img src={product.image} alt={product.name} />
                </div>
                <div className='productcard__popup'>
                    <span className='productcard__name'>{product.name.slice(0,30)}</span>
                    <div className='productcard__details u-center-text'>
                        <span className='productcard__catchphrase'>{product.catchPhrase}</span>
                        <div className='productcard__brand u-center-text'>
                            <div>Made by</div> 
                            <div>{product.brand}</div>
                        </div>
                    </div>
                </div>
                <div onClick={onProductCardClick} className='btn--primary u-display-none'>More info</div>
            </div>
    )
}

export default Product
