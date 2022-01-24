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
            <Figure className='cartitem__image' image={item.image} alt={item.name} description={item.description} height='10rem' />
            <div className='cartitem__price'>
                ${item.price} ea
            </div> 
            <Link 
                className="cartitem__link u-center-text" 
                to={`/product/${item.productId}`}
            >
                <p className='cartitem__name'>{item.name}</p>
                <p className='cartitem__variantdescription'>{item.identifier}</p>
            </Link>

            <form  className='u-center-text cartitem__select' value={item.qty} onChange={(e) => setQty(e.target.value)}>
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
                className='btn--navbar2 cartitem__delete'
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
