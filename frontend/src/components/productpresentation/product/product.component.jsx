import React from "react";
import { useNavigate } from "react-router-dom";
import "./product.styles.scss";
import Figure from "../../utilities/figure/figure.component";
import { motion } from "framer-motion";

const Product = ({ product }) => {
  const navigate = useNavigate();
  const onProductCardClick = () => {
    navigate(`/product/${product.slug}`);
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className='productcard u-box-shadow'
      onClick={onProductCardClick}>
      <Figure imageClickEvenWhenSmall pulltest={product.pulltest} className='productcard__image' image={product.image.image} alt={product.name} />
      <div className='productcard__name'>{product.name.slice(0, 30)}</div>
      <span className='productcard__button'>
        <i className='fas fa-plus-circle'></i>
      </span>
    </motion.div>
  );
};

export default Product;
