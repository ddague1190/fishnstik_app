import { useParams, useNavigate } from 'react-router-dom';
import {useState} from 'react';
import './addtocartcard.styles.scss';
import { useEffect } from 'react';

const AddToCartCard = ({product, checkedBoxIndex}) => {

    if (product.numVariants === 1 || !checkedBoxIndex) {
        let checkedBoxIndex = 0;
    }

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
            <div className='addtocartcard__price'>
                <span>Price / total:</span>
                <div>
                    <strong>
                        {product.variants[checkedBoxIndex].price} x {qty} = ${product.variants[checkedBoxIndex].price* qty }
                    </strong>
                </div>
            </div>
            <div className='addtocartcard__status'>
                <span>Status:</span>
                <div>
                    <strong>
                        { product.variants[checkedBoxIndex].countInStock > 0 ? 'In Stock' : 'Out of Stock' }
                    </strong>
                </div>
            </div>

        {product.variants[checkedBoxIndex].countInStock > 0 && (  
            <div className='addtocartcard__form'>  
                <span>Quantity:</span>
                <form value={qty} onChange={(e) => setQty(e.target.value)}>
                    <select value={qty}>
                    {                           
                        [...Array(product.variants[checkedBoxIndex].countInStock).keys()].map((x) => (
                            <option key={x+1} value={x+1}>
                                {x + 1}
                        </option>
                    ))
                    }
                        </select>
                </form>
            </div>              
        )}

            <button 
                onClick={()=> addToCartHandler(product.variants[checkedBoxIndex]._id)}
                className='addtocartcard__form--button animated-button calltoaction' 
                disabled={product.variants[checkedBoxIndex].countInStock === 0} 
                type='button'
            >
                Add to Cart
            </button>   
                    
    
        </div>
    )
}

export default AddToCartCard;