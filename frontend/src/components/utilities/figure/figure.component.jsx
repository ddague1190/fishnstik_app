import { useState, useEffect } from "react";
import "./figure.styles.scss";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ image, toggleShow, alt }) => {
  const callback = (e) => {
    e.preventDefault();
    toggleShow();
  };

  useEffect(() => {
    document.body.addEventListener("click", callback);
    return () => document.body.removeEventListener("click", callback);
  }, []);

  return ReactDOM.createPortal(
      <div className='modal__container'>
        <div className='modal' onClick={toggleShow}>
          <motion.img
            key={image}
            initial={{ y: -500, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "tween", duration: .6}}
            src={image}
            alt={`image_of_${alt}`}
          />
        </div>
      </div>,
    document.body
  );
};

const Figure = ({ animate, icon, height, image, alt, disable }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleShow = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div
        onClick={toggleShow}
        style={{ width: height, height: height }}
        className='figure'>
        {!icon ? (
          <AnimatePresence exitBeforeEnter>
            <motion.img
              initial={animate && { x: 600, opacity: 0 }}
              animate={animate && { x: 0, opacity: 1 }}
              exit={animate && {x: -600, opacity: 0}}
              transition={{ type: "tween", stiffness: 80}}
              src={image}
              key={image}
              alt={`image_of_${alt}`}
            />
          </AnimatePresence>
        ) : (
          <span className='figure__icon'>
            <i className='fas fa-camera'></i>
          </span>
        )}
      </div>
      {!disable && showModal && (
        <Modal image={image} toggleShow={toggleShow} alt={alt} />
      )}
    </>
  );
};

export default Figure;
