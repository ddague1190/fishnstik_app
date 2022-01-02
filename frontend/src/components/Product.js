import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'


function Product({ product }) { 
    return (
        <Card className="my-1 p-1 rounded max-content">
            <Link to={`/product/${product._id}`}>
                <div className='objectfit'>
                    <Card.Img className='fullsize' src={product.image}></Card.Img>
                </div>
            </Link>
            <Card.Body>
                <Link className="product-links" to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                {product.catchPhrase ? <span>{product.catchPhrase}</span> : ''}

                <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                    </div>
                </Card.Text>

                <Card.Text className='light border-top' >
                   {product.numVariants} types 
                </Card.Text>
                <Card.Text className='light'>
                   From ${Math.min(...product.variants.map(el=>el.price))} each
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
