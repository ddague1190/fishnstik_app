import React, { useState } from "react";
import "./figure.styles.scss";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useEffect } from "react";

const Modal = ({ image, toggleShow, alt }) => {
  const callback = (e) => {
    e.preventDefault();
    toggleShow();
  };

  const [zoom, setZoom] = useState(1);

  const zoomOut = () => {
    setZoom(zoom - 0.02);
  };

  const resetZoom = () => {
    setZoom(1);
  };

  const rule1 = {
    step: ".02",
  };
  const rule2 = {
    step: ".05",
  };
  return ReactDOM.createPortal(
    <div className='modal__container'>
      <div className='modal'>
        <TransformWrapper doubleClick={rule2} wheel={rule1}>
          {({ zoomIn, resetTransform, ...rest }) => (
            <React.Fragment>
              <motion.div drag className='modal__tools'>
                <div className='modal__buttons'>
                  <button
                    className='button modal__button'
                    onClick={() => zoomIn(0.02)}>
                    <i className='fa-solid fa-plus'></i>
                  </button>
                  <button
                    className='button modal__button'
                    onClick={() => {
                      zoomOut();
                    }}>
                    <i className='fa-solid fa-minus'></i>
                  </button>
                  <button
                    className='button modal__button'
                    onClick={() => {
                      resetTransform();
                      resetZoom();
                    }}>
                    RESET
                  </button>
                  <button className='button modal__button' onClick={toggleShow}>
                    CLOSE
                  </button>
                </div>

                <h4>
                  You can zoom image to match ruler in the picture to your own
                  ruler
                </h4>
              </motion.div>

              <TransformComponent>
                <motion.img
                  className='modal__image'
                  key={image}
                  style={{ scale: zoom }}
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "tween", duration: 0.6 }}
                  src={image}
                  alt={`image_of_${alt}`}
                />
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
    </div>,
    document.body
  );
};

const Figure = ({
  className,
  animate,
  icon,
  height,
  image,
  alt,
  disable,
  children,
}) => {
  const { width } = useSelector((state) => state.dimensions);
  const [showModal, setShowModal] = useState(false);
  const toggleShow = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    setShowModal(false);
  }, [width]);

  return (
    <>
      <div
        onClick={width > 600 ? toggleShow : null}
        style={{ width: height, height: height }}
        className={`figure ${className}`}>
          {width < 600 &&
        <div className='figure__open-button' onClick={toggleShow}>
          <span>Expand</span>
          <i className='fa fa-expand' aria-hidden='true'></i>
        </div>
}
        {!icon ? (
          <AnimatePresence exitBeforeEnter>
            <motion.img
              initial={animate && { y: -50, opacity: 0 }}
              animate={animate && { y: 0, opacity: 1 }}
              exit={animate && { y: 50, opacity: 0 }}
              transition={{ type: "tween", stiffness: 80 }}
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
        {children}
      </div>
      {!disable && showModal && (
        <Modal image={image} toggleShow={toggleShow} alt={alt} />
      )}
    </>
  );
};

export default Figure;
