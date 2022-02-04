import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Figure from '../figure/figure.component';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import './cartitem.styles.scss'


const CartItem = ({item}) => {
    const [qty, setQty] = useState(NaN);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(qty  ) {
            dispatch(addToCart(item.productId, item.variantId, qty));
        }
    }, [qty]);

    const removeFromCartHandler = (productId, variantId) => {
        dispatch(removeFromCart(productId, variantId))
    };

    return (
        <div className='cartitem'>
            <div className='cartitem__image'>
                <div className='cartitem__image-wrapper'>
                    <Figure image={item.image} alt={item.name} description={item.description} height='10rem' />
                </div>
                <span className='cartitem__price'>${item.price} ea</span>

            </div>
            
            <Link 
                className="cartitem__link" 
                to={`/product/${item.productId}`}
            >
                <p className='cartitem__name'>{item.name}</p>
                <p className='cartitem__variantdescription'>{item.variantIdentifier}</p>
            </Link>

            <form  className='cartitem__select' value={item.qty} onChange={(e) => setQty(e.target.value)}>
                <select className='cartform__select u-center-text' value={item.qty}>
                    {                           
                        [...Array(item.countInStock).keys()].map((x) => (
                            <option key={x+1} value={x+1}>
                                {x + 1}
                        </option>
                    ))
                    }
                </select>
            </form>
            <div
                className='cartitem__delete'
                type='button'
                variant='light'
                onClick={() => removeFromCartHandler(item.productId, item.variantId)}
            >
                <i className='fas fa-trash'></i>
            </div> 
        </div>
    );
};

export default CartItem;
