import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Figure from "../../utilities/figure/figure.component";
import styles from "./dropdown.module.scss";
import VariantQuantityDropdownSelect from "../../utilities/quantityselect/variant-quantity-dropdown.component";
import { cartParser } from "../../../utils/reduxSelectors";

const VariantDropDownSelect = ({
  userMovedDropdown,
  setUserMovedDropdown,
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
    setUserMovedDropdown(true);
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
        selected["qty"] = qty;
        selected["alreadyInCart"] = true;
      }
    });
    setSelectedVariant(selected);
  };

  return (
    <form className='select__form select__form--big'>
      <select
        className='select__dropdown select__dropdown--big'
        onChange={onChangeHandler}>
        <option disabled={userMovedDropdown}>Select option...</option>
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
  const [userMovedDropdown, setUserMovedDropdown] = useState(false);
  const { width } = useSelector((state) => state.dimensions);
  const breakpoint = 560;
  const breakpoint2 = 460;
  const { userInfo } = useSelector((state) => state.userLogin);
  const [cartStatus, setCartStatus] = useState({});
  useEffect(() => {}, [selectedVariant]);
  useEffect(() => {}, [cartStatus]);

  return (
    <div className={styles.container}>
      <div className={styles.dropdowns}>
        <VariantDropDownSelect
          userMovedDropdown={userMovedDropdown}
          setUserMovedDropdown={setUserMovedDropdown}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          variants={variants}
        />

        {userMovedDropdown && (
          <div className={styles.quantityDropdown}>
            <div>
              {cartStatus.alreadyInCart && <span>Change quantity</span>}
              <VariantQuantityDropdownSelect
                product={product}
                variants={variants}
                selectedVariant={selectedVariant}
                setSelectedVariant={setSelectedVariant}
                cartStatus={cartStatus}
                setCartStatus={setCartStatus}
              />
            </div>
          </div>
        )}
      </div>

      <div className={styles.discountPrice}>
        {selectedVariant.alreadyInCart && (
          <>
            <span>Subtotal</span>
            <h2>
              $
              {cartStatus.alreadyInCart &&
                (cartStatus.qty * selectedVariant.discountPrice).toFixed(2)}
            </h2>
          </>
        )}
      </div>

      <div className={styles.description}>
        <Link to={`/product/${product._id}`}>
          <p>{selectedVariant.name} </p>
          <p>{selectedVariant.description}</p>
        </Link>
      </div>
      {selectedVariant.image && (
        <div className={styles.image}>
          <Figure image={selectedVariant.image} />
        </div>
      )}
    </div>
  );
};

export default PreCartDropdown;
