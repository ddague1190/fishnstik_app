import React, { useState, useEffect, useRef } from "react";
import "./fishfact.styles.scss";
import { getFishSpecies } from "../../../redux/actions/promoActions";
import { batch, useDispatch, useSelector } from "react-redux";
import Figure from "../../utilities/figure/figure.component";
import { ReactComponent as Logo } from "./fishwatchlogo.svg";
import { ReactComponent as LookInside } from "./lookinside.svg";

import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
} from "framer-motion";
import { pageVariants } from "../../../utils/variants";

const Ellipsis = ({ title, text, className }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className={`ellipsis ${className}`}>
      <span className='ellipsis__title'>{title}</span>
      <p className='ellipsis__text'>
        {readMore ? text + " " : text?.substring(0, 250) + "..."}
      </p>
      {!readMore && (
        <span className='ellipsis__ellipsis' onClick={() => setReadMore(true)}>
          {" "}
          [... read more]
        </span>
      )}
    </div>
  );
};

const FishFact = () => {
  const dispatch = useDispatch();
  const [fishSpeciesIndex, setFishSpeciesIndex] = useState(8);
  const [expanded, setExpanded] = useState(false);
  const { loading, error, fish } = useSelector((state) => state.fishFact);
  const { width } = useSelector((state) => state.dimensions);
  const [currentPic, setCurrentPic] = useState({});

  const animateWindow = useAnimation();
  const animateSpacer = useAnimation();
  const breakpoint = 500;
  const breakpoint2 = 400;
  const breakpoint3 = 600;

  useEffect(() => {
    dispatch(getFishSpecies(fishSpeciesIndex));
  }, []);

  useEffect(() => {
    setCurrentPic({
      pic: images[0],
      index: 0,
    });
  }, [loading]);

  const images = String(fish.images).split(",");

  const changePic = (index) => {
    setCurrentPic({
      pic: images[index],
      index: index,
    });
  };

  const nextSpeciesHandler = () => {
    setCurrentPic({
      pic: images[0],
      index: 0,
    });
    dispatch(getFishSpecies(fishSpeciesIndex + 1));
    setFishSpeciesIndex(fishSpeciesIndex + 1);
    if (fishSpeciesIndex > 110) {
      setFishSpeciesIndex(8);
    }
  };

  const expandWindow = async (e) => {
    e.preventDefault();
    setExpanded(true);
    await animateWindow.start({
      scale: 1,
      x: 0,
    });
    await animateSpacer.start({
      height: width<650 ? '140rem' : "120rem",
    });
  };

  return (
    <div
      className={`fishfacts-section ${
        !expanded ? "" : "fishfacts-section--noAfter"
      }`}
      onClick={!expanded ? expandWindow : null}>
      {!expanded && (
        <div className='fishfacts__lookinside'>
          <LookInside />
          <h3>Learn more about various species</h3>
        </div>
      )}
      <motion.div
        className='fishfacts-window'
        initial={{ scale: 0.5, x: "-22vw" }}
        animate={animateWindow}
        transition={{ duration: 1 }}>
        <motion.div
          className='fishfacts-spacer'
          initial={{ height: "40rem" }}
          animate={animateSpacer}
          transition={{ duration: 1 }}></motion.div>

        <div className='fishfacts-container'>
          <>
            {loading ? (
              <div className='fishfacts__spaceholder'></div>
            ) : (
              <AnimatePresence exitBeforeEnter>
                <motion.div
                  variants={pageVariants}
                  initial='initial'
                  animate='in'
                  exit='out'
                  className='fishfacts'>
                  <header className='fishfacts__header'>
                    <Logo />
                    <div
                      onClick={expanded ? nextSpeciesHandler : null}
                      className='fishfacts__next'>
                      <span className='fishfacts__next--1'>
                        Species {fishSpeciesIndex - 7} of 108
                      </span>
                      <span className='fishfacts__next--2'>
                        See another profile
                      </span>
                    </div>
                  </header>
                  <div className='fishfacts__image-container'>
                    <Figure
                      animate
                      image={currentPic.pic}
                      height={
                        width > breakpoint
                          ? "47rem"
                          : width > breakpoint2
                          ? "45rem"
                          : "38rem"
                      }
                      disable={!expanded}
                    />

                    <div
                      className='featured__image-selector fishfacts__image-selector'>
                     {images.map((_, index) => {
                        return (
                          <div
                            key={index}
                            onClick={() => changePic(index)}
                            className={
                              index === currentPic.index
                                ? "featured__image-selector-dot featured__image-selector-dot--active"
                                : "featured__image-selector-dot"
                            }
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className='fishfacts__name'>
                    <h3>{fish["Species Name"]}</h3>
                    <h5>
                      <i>{fish["Scientific Name"]}</i>
                    </h5>
                  </div>
                  <ul className='fishfacts__factoids'>
                    <li>
                      <strong>Protein:</strong> {fish["Protein"]}
                    </li>
                    <li>
                      <strong>Taste:</strong> {fish["Taste"]}
                    </li>
                    <li>
                      <strong>Health benefits:</strong>{" "}
                      {fish["Health Benefits"]}
                    </li>
                  </ul>
                  <Ellipsis
                    className='fishfacts__des'
                    title='Physical Description'
                    text={fish["Physical Description"]}
                  />
                  <Ellipsis
                    className='fishfacts__bio'
                    title='Biology'
                    text={fish["Biology"]}
                  />
                  <Ellipsis
                    className='fishfacts__hab'
                    title='Habitat'
                    text={fish["Habitat"]}
                  />
                  <br />
                  <br />

                  <span className='fishfacts__credit'>
                    Courtesy of: https://www.fishwatch.gov/
                  </span>
                </motion.div>
              </AnimatePresence>
            )}
          </>
        </div>
      </motion.div>
    </div>
  );
};

export default FishFact;
