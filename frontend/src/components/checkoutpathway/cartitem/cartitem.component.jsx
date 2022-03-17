import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Figure from "../../utilities/figure/figure.component";
import "./cartitem.styles.scss";
import QuantitySelect from "../../utilities/quantityselect/quantityselect.component";

const CartItem = ({ item }) => {
  const { width } = useSelector((state) => state.dimensions);
  const breakpoint = 560;
  const breakpoint2 = 460;


  return (
    <div className='cartitem'>
      <div className='cartitem__product'>
        {width > breakpoint2 ? (
          <div className='cartitem__image'>
            <div className='cartitem__image-wrapper'>
              <Figure
                imageClickEvenWhenSmall
                image={item.image}
                alt={item.name}
                description={item.description}
                // height={width < breakpoint ? "12rem" : "20rem"}
              />
            </div>
          </div>
        ) : (
          <div className='cartitem__imageicon'>
            <Figure
              imageClickEvenWhenSmall
              icon
              image={item.image}
              alt={item.name}
              description={item.description}
            />
          </div>
        )}

        <Link className='cartitem__link' to={`/product/${item.productId}`}>
          <p className='cartitem__name'>{item.name} </p>
          <span className='cartitem__variantdescription'>
            {item.variantIdentifier} 
          </span>
        </Link>
      </div>
      <div className='cartitem__params'>
        <div className='cartitem__quantity'>
          <div className='cartitem__item-price'>
            <span>Your Price</span>
            <span>${item.qty * item.price}</span>
          </div>

          <span>Quantity</span>
          <QuantitySelect item={item} />
        </div>
        <div className='cartitem__select'>
          <span>Subtotal</span>
          <h2>${(item.qty * item.price).toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
