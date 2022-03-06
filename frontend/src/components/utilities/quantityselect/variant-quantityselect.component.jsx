import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../../redux/actions/cartActions';
import './quantityselect.styles.scss';
import { cartParser } from '../../../utils/reduxSelectors';

const VariantQuantitySelect = ({oneVariant, product, variant, setCartStatus}) => {
    const [alreadyInCart, setAlreadyInCart] = useState(false);
    const [selectedValue, setSelectedValue] = useState(0); 
    const parsedCart = useSelector(cartParser);
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();


    useEffect(()=> {
        parsedCart.forEach(({productId, variantId, qty})=>{
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
            <motion.div initial={{textShadow: 'none', boxShadow: 'none'}} animate={{textShadow: '0, 10px, 10px black', boxShadow: '0, 2px, 2px, red'}}   transition={{
                repeat: 10,
                duration: .4
              }}>
                <Link to='/cart'><button type='submit' className={`select__button select__button--checkout ${oneVariant ? 'select__button--oneVariant' : ''}`}>Proceed to Checkout</button></Link>
            </motion.div>
        ): (<button type='submit' onClick={()=>setSelectedValue(1)} className={`select__button ${oneVariant ? 'select__button--oneVariant' : ''}`}>Add to Cart</button>
        )}

    </>
  );
};

export default VariantQuantitySelect;