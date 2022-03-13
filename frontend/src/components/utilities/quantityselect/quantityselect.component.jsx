import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../../redux/actions/cartActions";
import "./quantityselect.styles.scss";
 
const QuantitySelect = ({ item }) => {
  const dispatch = useDispatch();
  const quantitySelectHandler = (e) => {
    if (e.target.value === "Remove") {
      dispatch(removeFromCart(item.productId, item.variantId));
      return;
    }
    dispatch(addToCart({...item, qty: e.target.value}));
  };
  return (
    <form className='select__form'>
      <select
        className='select__dropdown'
        value={item.qty}
        onChange={quantitySelectHandler}>
        <option>Remove</option>
        {[...Array(item.countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
    </form>
  );
};

export default QuantitySelect;
