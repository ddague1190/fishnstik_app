import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Figure from "../../utilities/figure/figure.component";
import "./oneVariant.styles.scss";
import VariantQuantitySelect from "../../utilities/quantityselect/variant-quantityselect.component";

const OneVariant = ({ product, variant }) => {
  const { width } = useSelector((state) => state.dimensions);
  const breakpoint = 560;
  const breakpoint2 = 460;
  const mobilePriceIndicator =
    width < breakpoint2 ? <span>(${variant.price})</span> : null;
  const [cartStatus, setCartStatus] = useState({
    qty: 0,
    alreadyInCart: false,
  });
  const [showPlaceholder, setShowPlaceholder] = useState(
    variant.countInStock < 1
  );

  return (
    <>
      {!showPlaceholder ? (
        <div className='oneVariant'>

          {variant.countInStock > 0 ? (
            <>
              <div className='oneVariant__quantity'>
                {cartStatus.alreadyInCart ? (
                  <span>Change quantity</span>
                ) : (
                  <span>Select quantity</span>
                )}
                <VariantQuantitySelect
                    oneVariant
                  product={product}
                  variant={variant}
                  setCartStatus={setCartStatus}
                />
              </div>
              <div className='oneVariant__select'>
                {cartStatus.alreadyInCart && (
                  <>
                    <span>Subtotal</span>
                    <h2>
                      $
                      {cartStatus.alreadyInCart &&
                        (cartStatus.qty * variant.price).toFixed(2)}
                    </h2>
                  </>
                )}
              </div>
            </>
          ) : (
            <h3
              className='oneVariant__outofstock'
              onClick={() => setShowPlaceholder(true)}>
              Out of stock
            </h3>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='outofstock'>
          <div className='outofstock__content'>
            <div className='outofstock__name'>{variant.identifier}</div>
            <p className='outofstock__info'>
              Out of stock. Contact us for availability.
            </p>
          </div>
          <div
            className='outofstock__expand'
            onClick={() => setShowPlaceholder(false)}>
            <span>
              <i className='fas fa-plus-circle'></i>
            </span>
            <span>View details</span>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default OneVariant;
