import React, { useState, useEffect } from "react";
import "./fishfact.styles.scss";
import { getFishSpecies } from "../../../redux/actions/promoActions";
import { useDispatch, useSelector } from "react-redux";
import Figure from "../../utilities/figure/figure.component";
import { ReactComponent as Logo } from "./fishwatchlogo.svg";
import { AnimatePresence, motion } from "framer-motion";
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
  const [imageIndex, setImageIndex] = useState(0);
  const [fishSpeciesIndex, setFishSpeciesIndex] = useState(8);
  const { loading, error, fish } = useSelector((state) => state.fishFact);
  const { width } = useSelector((state) => state.dimensions);
  const breakpoint = 500;
  const breakpoint2 = 400;
  const breakpoint3 = 600;

  useEffect(() => {
    console.log("didMount");
    dispatch(getFishSpecies(fishSpeciesIndex));
  }, []);

  let images = String(fish.images).split(",");

  const onNextClick = () => {
    if (imageIndex === images.length - 1) {
      setImageIndex(0);
    } else setImageIndex(imageIndex + 1);
  };

  const nextSpeciesHandler = () => {
    setImageIndex(0);
    dispatch(getFishSpecies(fishSpeciesIndex + 1));
    setFishSpeciesIndex(fishSpeciesIndex + 1);
    if (fishSpeciesIndex > 110) {
      setFishSpeciesIndex(8);
    }
  };

  console.log(width);

  return (
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
              <div onClick={nextSpeciesHandler} className='fishfacts__next'>
                <span className='fishfacts__next--1'>
                  Species {fishSpeciesIndex - 7} of 108
                </span>
                <span className='fishfacts__next--2'>See another profile</span>
              </div>
            </header>
            <div className='fishfacts__image-container'>
              <Figure
                animate
                image={
                  images[imageIndex]
                    ? images[imageIndex]
                    : images[imageIndex + 1]
                }
                height={
                  width > breakpoint
                    ? "60rem"
                    : width > breakpoint2
                    ? "50rem"
                    : "38rem"
                }
              />

              <span className='fishfacts__image-right' onClick={onNextClick}>
                <i className='fa-solid fa-chevron-right'></i>
              </span>
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
                <strong>Health benefits:</strong> {fish["Health Benefits"]}
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
  );
};

export default FishFact;
