import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import Figure from "../../utilities/figure/figure.component";
import "./cartitem.styles.scss";
import VariantQuantitySelect from "../../utilities/quantityselect/variant-quantityselect.component";
import { useEffect } from "react";
import { PriceBox } from "./pre-cartitem.component";

const VariantDropDownSelect = ({
  variants,
  setSelectedVariant,
  selectedVariant,
}) => {
  const variantsObj = {};
  const variantsObjFromArray = () => {
    variants.map((item, index) => {
      variantsObj[item._id] = { ...item };
    });
  };

  useEffect(() => {
    variantsObjFromArray();
  }, []);

  const onChangeHandler = (e) => {
    setSelectedVariant({...variantsObj[e.target.value]});
  };
  return (
    <form className='select__form select__form--big'>
      <select
        className='select__dropdown select__dropdown--big'
        onChange={onChangeHandler}>
        <option disabled>Select option...</option>
        {variants.map((item, index) => {
          return (
            <option key={index} value={item._id}>
              {item.identifier}
            </option>
          );
        })}
      </select>
    </form>
  );
};

const PreCartDropdown = ({ product, variants }) => {
  const [selectedVariant, setSelectedVariant] = useState({});

  const { width } = useSelector((state) => state.dimensions);

  const breakpoint = 560;
  const breakpoint2 = 460;

  const { userInfo } = useSelector((state) => state.userLogin);

  const [cartStatus, setCartStatus] = useState({
    qty: 0,
    alreadyInCart: false,
  });

  useEffect(()=>{
    console.log(selectedVariant)
  }, [selectedVariant])
  useEffect(() => {}, [cartStatus]);

  return (
    <div className='cartitem cartitem--mobile'>
      <div className='cartitem__product'>
        {width > breakpoint2 ? (
          <div className='cartitem__image'>
            <div className='cartitem__image-wrapper'>
              <Figure
                imageClickEvenWhenSmall
                // image={variant.image}
                // alt={variant.name}
                // description={variant.description}
                height={width < breakpoint ? "12rem" : "20rem"}
              />
            </div>
          </div>
        ) : (
          <div className='cartitem__imageicon'>
            <Figure
              imageClickEvenWhenSmall
              icon
              // image={variant.image}
              // alt={variant.identifier}
              // description={variant.description}
            />
          </div>
        )}

        <div className='cartitem__dropdown'>
          <VariantDropDownSelect
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            variants={variants}
          />
        </div>

        <Link className='cartitem__link' to={`/product/${product._id}`}>
          <p className='cartitem__name'>{selectedVariant.name} </p>
          <p className='cartitem__variantdescription'>
            {selectedVariant.description}
          </p>
        </Link>
      </div>
      <div
        className={`cartitem__params ${
          cartStatus.alreadyInCart && "cartitem__params--added"
        }`}>
        <div className='cartitem__quantity'>
          {cartStatus.alreadyInCart ? (
            <span>Change quantity</span>
          ) : (
            <span style={{ display: userInfo ? "block" : "none" }}>
              Select quantity
            </span>
          )}
          {/* <VariantQuantitySelect
                    product={product}
                    // variant={variant}
                    setCartStatus={setCartStatus}
                  /> */}
        </div>
        <div className='cartitem__select'>
          {cartStatus.alreadyInCart && (
            <>
              <span>Subtotal</span>
              <h2>
                ${/* {cartStatus.alreadyInCart && */}
                // (cartStatus.qty * variant.discountPrice).toFixed(2)}
              </h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreCartDropdown;
