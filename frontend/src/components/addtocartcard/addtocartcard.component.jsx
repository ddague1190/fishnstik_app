import { useParams, useNavigate } from 'react-router-dom';
import {useState} from 'react';
import './addtocartcard.styles.scss';
import { useEffect } from 'react';

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
            <div className='cartform'>  
                <span className={`cartform__status ${product.variants[checkedBoxIndex].countInStock > 0 ? 'cartform__status--instock' : ''}`}>                
                    { product.variants[checkedBoxIndex].countInStock > 0 && 'In Stock'}
                </span>
                <h6 className='cartform__quantity'>Purchase quantity:</h6>
                <form  value={qty} onChange={(e) => setQty(e.target.value)}>
                    <select className='cartform__select' value={qty}>
                    {                           
                        [...Array(product.variants[checkedBoxIndex].countInStock).keys()].map((x) => (
                            <option key={x+1} value={x+1}>
                                {x + 1}
                        </option>
                    ))
                    }
                        </select>
                </form>
                <h6 className='cartform__pricelabel'>Total price:</h6>
                <h4 className='cartform__price'>
                    ${product.variants[checkedBoxIndex].price} ea x {qty} = ${(product.variants[checkedBoxIndex].price* qty).toFixed(2) } 
                </h4>   
                <button 
                    onClick={()=> addToCartHandler(product.variants[checkedBoxIndex]._id)}
                    className='cartform__button animated-button calltoaction' 
                    disabled={product.variants[checkedBoxIndex].countInStock === 0} 
                    type='button'
                >
                    Add to Cart
                </button> 
            </div>  
        )}
        </div>
    )
}

export default AddToCartCard;