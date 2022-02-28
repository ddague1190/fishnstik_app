import React, { useEffect } from "react";
import {
  Link,
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../utilities/message/message.component";
import { addToCart } from "../../../redux/actions/cartActions";
import CartItem from "../cartitem/cartitem.component";
import "./cartscreen.styles.scss";

const CartScreen = () => {
  const productId = useParams().id;
  let navigate = useNavigate();
  let qty = parseInt(useLocation().search.split("=")[1]);
  if (!qty) qty = 1;

  const [searchParams, setSearchParams] = useSearchParams();
  const variantId = Number(searchParams.get("variant"));

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, variantId, qty));
    }
  }, [dispatch, productId, variantId]);

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className='cartscreen'>
      <h2 className='u-center-text'>Items in your cart</h2>
      {cartItems.length === 0 ? (
        <Message variant='info'>
          Your cart is empty <Link to='/'>Go Back</Link>
        </Message>
      ) : (
        <div className='cartitems-container'>
          {cartItems.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
          <div className='cartitems-container__grandtotal'>
            <span>Grandtotal</span>
            <h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </h2>
          </div>
        </div>
      )}
      <div className='cartitems-container__spacer'></div>
      <div className='u-center-text'>
        <button
          type='submit'
          className='button'
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}>
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default CartScreen;
