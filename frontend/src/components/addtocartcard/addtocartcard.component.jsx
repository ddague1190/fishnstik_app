import { useParams, useNavigate } from 'react-router-dom';
import {useState} from 'react';
import './addtocartcard.styles.scss';
import { useEffect } from 'react';
import styled from 'styled-components'

const AddToCartCard = ({product, checkedBoxIndex}) => {

    const productId = useParams();
    let navigate = useNavigate();
    const [qty, setQty] = useState(1);
    const addToCartHandler = (variantId) => {
        navigate(`/cart/${productId.id}?qty=${qty}&variant=${variantId}`)
    }

    useEffect(()=>{
        setQty(1);
    }, [checkedBoxIndex])

    return (
        <div className='addtocartcard'>



        {product.variants[checkedBoxIndex].countInStock > 0 && (  
            <div className='cartform u-margin-top-medium'>  
                {/* <span className='cartform__status u-center-text'>               
                    { product.variants[checkedBoxIndex].countInStock > 0 && 'In Stock'}
                </span> */}
                <h4 className='cartform__quantity'>Purchase quantity:</h4>
                <form  className='u-center-text' value={qty} onChange={(e) => setQty(e.target.value)}>
                    <select className='cartform__select u-center-text' value={qty}>
                    {                           
                        [...Array(product.variants[checkedBoxIndex].countInStock).keys()].map((x) => (
                            <option key={x+1} value={x+1}>
                                {x + 1}
                        </option>
                    ))
                    }
                        </select>
                </form>
                <h4 className='cartform__pricelabel'>Total price:</h4>
                <h3 className='cartform__price u-center-text'>
                    ${product.variants[checkedBoxIndex].price} ea x {qty} = ${(product.variants[checkedBoxIndex].price* qty).toFixed(2) } 
                </h3>   
                <div 
                    className='btn--navbar'
                    style={{
                        'margin': '0 auto', 
                        'z-index': '10',
                        'grid-column': '1 / -1'
                    }}
                    onClick={()=> addToCartHandler(product.variants[checkedBoxIndex]._id)}
                    disabled={product.variants[checkedBoxIndex].countInStock === 0} 
                    type='button'
                >
                    Add to Cart
                </div> 
            </div>  
        )}
        </div>
    )
}

export default AddToCartCard;