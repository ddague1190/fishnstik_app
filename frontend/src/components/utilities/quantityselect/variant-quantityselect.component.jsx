import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../../redux/actions/cartActions';
import './quantityselect.styles.scss';
import { cartParser } from '../../../utils/reduxSelectors';

const VariantQuantitySelect = ({product, variant, setCartStatus}) => {
    const [alreadyInCart, setAlreadyInCart] = useState(false);
    const [selectedValue, setSelectedValue] = useState(0); 
    const parsedCart = useSelector(cartParser);
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();


    useEffect(()=> {
        parsedCart.forEach(({productId, variantId, qty})=>{
            console.log(productId, variantId)
            if (productId===product._id && variantId===variant._id) {
                setAlreadyInCart(true);
                setQty(qty);
                setCartStatus({qty, alreadyInCart});
            }
        })
    }, [parsedCart, product._id, variant._id])

    useEffect(()=> {
        if(selectedValue==='Remove') {
            dispatch(removeFromCart(product._id, variant._id));
            setAlreadyInCart(false);
            setQty(1);
            setCartStatus({'qty': 1, 'alreadyInCart': false});
            return; 
        }
        else if(selectedValue>0) {
            dispatch(addToCart(product._id, variant._id, selectedValue));
            setAlreadyInCart(true);
            setQty(selectedValue);
            setCartStatus({'qty': selectedValue, 'alreadyInCart': true});
        }   
    }, [selectedValue])


  return (
      <>
        <form  className='select__form'>
            <select className='select__dropdown' value={qty} onChange={(e)=>setSelectedValue(e.target.value)}>
                {alreadyInCart && <option>Remove</option>}
                {   
                    [...Array(variant.countInStock).keys()].map((x) => (
                        <option key={x+1} value={x+1}>
                            {x + 1}
                        </option>
                    ))
                    
                }
            </select> 
        </form>
        {alreadyInCart ? (
            <Link to='/cart'><button type='submit' className='select__button select__button--checkout'>Proceed to Checkout</button></Link>
        ): (<button type='submit' onClick={()=>setSelectedValue(1)} className='select__button'>Add to Cart</button>
        )}

    </>
  );
};

export default VariantQuantitySelect;