import React from 'react'
import { useNavigate } from 'react-router-dom'
import './product.styles.scss'
import { AnimatePresence, motion } from 'framer-motion'



const Product = ({ product }) => { 

    const navigate = useNavigate();
    const onProductCardClick = () => {
        navigate(`/product/${product._id}`)
    }

    return (
        <AnimatePresence>
            <motion.div whileHover= {{y: -3}} className='productcard u-box-shadow' onClick={onProductCardClick}>
                <img className='productcard__image' src={product.image} alt={product.name} />
                <div className='productcard__name'>{product.name.slice(0,30)}</div>
                <span className='productcard__button'><i className="fas fa-plus-circle"></i></span>
            </motion.div>
            </AnimatePresence>
    )
}

export default Product
