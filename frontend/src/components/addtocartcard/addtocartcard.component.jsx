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
            <table className='cartform u-margin-top-medium'>  
                <tr>
                    <h3 className='cartform__quantity'>Purchase quantity:</h3>
                    <div>
                        {product.variants[checkedBoxIndex].countInStock > 0 ? (
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
                        ) : <h4>Out of stock</h4> }
                    </div>
                </tr>
                <tr>
                    <h3 className='cartform__pricelabel'>Total price:</h3>
                    <span className='paragraph u-center-text'>
                        ${product.variants[checkedBoxIndex].price} ea x {qty} = ${(product.variants[checkedBoxIndex].price* qty).toFixed(2) } 
                    </span> 
                </tr>
                <tr>
                    <div 
                    className='btn--main'
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
                </tr>
            </table>  
        </div>
    )
}

export default AddToCartCard;