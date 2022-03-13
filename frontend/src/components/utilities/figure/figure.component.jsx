import React, { useState } from "react";
import "./figure.styles.scss";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useEffect } from "react";

const Modal = ({ image, toggleShow, showModal, alt }) => {
  const closeModalHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (
      e.target.closest(".image-wrapper") ||
      e.target.closest(".modal__tools")
    ) {
      return;
    }
    if (showModal) {
      toggleShow();
    }
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
    <div className='modal__container' onClick={closeModalHandler}>
      <div className='modal'>
        <TransformWrapper doubleClick={rule2} wheel={rule1}>
          {({ zoomIn, resetTransform, ...rest }) => (
            <React.Fragment>
              <motion.div
                drag
                className='modal__tools'
                onClick={(e) => e.stopPropagation}>
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

              <div className='image-wrapper' onClick={(e) => e.stopPropagation}>
                <TransformComponent>
                  <motion.img
                    className='modal__image'
                    key={image}
                    style={{ scale: zoom }}
                    initial={{ y: -10, opacity: 0.5 }}
                    animate={{ y: 0, opacity: 1 }}
                    src={image}
                    alt={`image_of_${alt}`}
                  />
                </TransformComponent>
              </div>
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
    </div>,
    document.body
  );
};

const Figure = ({
  pulltest,
  imageClickEvenWhenSmall,
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

  const onImageClick = () => {
    if (width > 600 || imageClickEvenWhenSmall) {
      toggleShow();
      return;
    }
  };

  useEffect(() => {
    setShowModal(false);
  }, [width]);

  return (
    <>
      <div
        onClick={onImageClick}
        style={{ width: height, height: height }}
        className={`figure ${className}`}>
        {width < 600 && !imageClickEvenWhenSmall && (
          <div className='figure__open-button' onClick={toggleShow}>
            <span>Expand</span>
            <i className='fa fa-expand' aria-hidden='true'></i>
          </div>
        )}

        {pulltest && (
          <div className='figure__open-button figure__pulltest'>
            <span>#{pulltest}</span>
          </div>
        )}
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
        <Modal
          image={image}
          showModal={showModal}
          toggleShow={toggleShow}
          alt={alt}
        />
      )}
    </>
  );
};

export default Figure;
