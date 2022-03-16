import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Figure from "../../utilities/figure/figure.component";
import "./cartitem.styles.scss";
import VariantQuantityDropdownSelect from "../../utilities/quantityselect/variant-quantity-dropdown.component";
import { PriceBox } from "./pre-cartitem.component";
import { cartParser } from "../../../utils/reduxSelectors";

const VariantDropDownSelect = ({
  variants,
  setSelectedVariant,
  selectedVariant,
}) => {
  const [variantsObj, setVariantsObj] = useState({});
  const variantsObjFromArray = () => {
    variants.map((item, index) => {
      variantsObj[item._id] = {
        ...item,
        qty: 1,
        alreadyInCart: false,
        productId: item.product,
        variantId: item._id,
      };
    });
  };

  useEffect(() => {
    variantsObjFromArray();
  }, []);

  const parsedCart = useSelector(cartParser);

  const onChangeHandler = (e) => {
    const selected = {
      ...variantsObj[e.target.value],
      qty: 1,
      alreadyInCart: false,
    };

    parsedCart.forEach(({ productId, variantId, qty }) => {
      if (
        selected.productId === productId &&
        selected.variantId === variantId
      ) {
        selected['qty'] = qty;
        selected['alreadyInCart'] = true;
      }
    });
    setSelectedVariant(selected);
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

  const [cartStatus, setCartStatus] = useState({});

  useEffect(() => {}, [selectedVariant]);
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
          <VariantQuantityDropdownSelect
            product={product}
            variants={variants}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            cartStatus={cartStatus}
            setCartStatus={setCartStatus}
          />
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
