import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../../redux/actions/cartActions";
import { cartParser } from "../../../utils/reduxSelectors";
import { PriceBox } from "../../checkoutpathway/cartitem/pre-cartitem.component";
import { useParams } from "react-router";
import "./quantityselect.styles.scss";
import styles from "../../checkoutpathway/cartitem/dropdown.module.scss";

const VariantQuantityDropdownSelect = ({
  oneVariant,
  product,
  variants,
  cartStatus,
  setCartStatus,
  selectedVariant,
  setSelectedVariant,
}) => {
  const [selectedValue, setSelectedValue] = useState(0);
  const parsedCart = useSelector(cartParser);
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const loginAndComeBack = () => {
    navigate(`/login?redirect=/products${id}`);
  };

  useEffect(() => {
    parsedCart.forEach(({ productId, variantId, qty }) => {
      if (
        productId === product._id &&
        variants.find(({ _id }) => _id === variantId)
      ) {
        setSelectedVariant({
          ...selectedVariant,
          qty: qty,
          alreadyInCart: true,
        });
      }
    });
  }, [parsedCart, product._id]);

  useEffect(() => {
    if (selectedValue === "Remove") {
      dispatch(removeFromCart(product._id, selectedVariant.variantId));
      setSelectedVariant({ ...selectedVariant, qty: 1, alreadyInCart: false });
      return;
    } else if (selectedValue > 0) {
      dispatch(
        addToCart({
          productId: product._id,
          variantId: selectedVariant.variantId,
          name: product.name,
          variantIdentifier: selectedVariant.identifier,
          image: selectedVariant.image,
          price: selectedVariant.discountPrice,
          countInStock: selectedVariant.countInStock,
          qty: selectedValue,
        })
      );
      setSelectedVariant({
        ...selectedVariant,
        qty: selectedValue,
        alreadyInCart: true,
      });
    }
  }, [selectedValue]);

  return (
    <>
      <div className={styles.pricebox}>
        <PriceBox
          alreadyInCart={selectedVariant.alreadyInCart}
          price={selectedVariant.price}
          discountPrice={selectedVariant.discountPrice}
        />
      </div>
      {userInfo && (
        <form className='select__form select__form--wide'>
          <select
            className='select__dropdown'
            value={
              selectedVariant.alreadyInCart
                ? selectedVariant.qty
                : "Select value"
            }
            onChange={(e) => setSelectedValue(e.target.value)}>
            {!selectedVariant.alreadyInCart && <option>Select value</option>}
            {selectedVariant.alreadyInCart && <option>Remove</option>}
            {[...Array(selectedVariant.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </form>
      )}
      {selectedVariant.alreadyInCart ? (
        <motion.div
          initial={{ textShadow: "none", boxShadow: "none" }}
          animate={{
            textShadow: "0, 10px, 10px black",
            boxShadow: "0, 2px, 2px, red",
          }}
          transition={{
            repeat: 10,
            duration: 0.4,
          }}>
          <Link to='/cart'>
            <button
              type='submit'
              className={`select__button select__button--checkout ${
                oneVariant ? "select__button--oneVariant" : ""
              }`}>
              Proceed to Checkout
            </button>
          </Link>
        </motion.div>
      ) : (
        <button
          type='submit'
          onClick={userInfo ? () => setSelectedValue(1) : loginAndComeBack}
          className={`select__button select__button--dropdown ${
            oneVariant ? "select__button--oneVariant" : ""
          }`}>
          {userInfo ? "Add to Cart" : "Login to add"}
        </button>
      )}
    </>
  );
};

export default VariantQuantityDropdownSelect;
