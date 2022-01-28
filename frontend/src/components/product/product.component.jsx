import React from 'react'
import { useNavigate } from 'react-router-dom'
import './product.styles.scss'



const Product = ({ product }) => { 

    const navigate = useNavigate();
    const onProductCardClick = () => {
        navigate(`/product/${product._id}`)
    }

    return (
            <div className='productcard u-box-shadow'>
                <img className='productcard__image' src={product.image} alt={product.name} />
                <div className='productcard__name u-retro-font--2'>{product.name.slice(0,30)}</div>
                <span onClick={onProductCardClick} className='productcard__button'><i class="fas fa-plus-circle"></i></span>
            </div>
    )
}

export default Product
