import "./frontpagebanner.styles.scss";
import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, useCycle, useAnimation, AnimatePresence } from "framer-motion";
import FrontPageSVG from "./FrontPageSVG";
import RodSVG from "./RodSVG";
import Emotive from "./Emotive";
import Waves from "./Waves";
import Invitation from "./Invitation";
import {
  sentenceVariants,
  letterVariants,
  letterVariants__title,
  sentenceVariants__slogan,
} from "../../../utils/variants";

const titleToBlack = (i) => ({
  color: "black",
  transition: {
    delay: i * 0.1,
  },
});

const titleToGone = (i) => ({
  opacity: 0,
  transition: {
    delay: i * 0.1,
    duration: 1,
  },
});



const Banner = () => {
  const [castRod, setCastRod] = useState(false);
  const [showEmotive, setShowEmotive] = useState(false);
  const [hideInvitation, setHideInvitation] = useState(true)
  const [hideFrontPageSVG, setHideFrontPageSVG] = useState(false)
  const animateTitle = useAnimation();
  const animateSlogan = useAnimation();
  const animateBanner = useAnimation();
  const animateSwivelSnap = useAnimation();
  const {width} = useSelector(state=>state.dimensions)
  const bannerVariants = {
    full: {
      y: 0,
    },
    shrunk: {
      y: `-${width*.55}px`,
    },
  };

  const animate = async () => {
    setCastRod(true);
    await animateTitle.start(titleToBlack);
    animateTitle.start(titleToGone);
    await animateSlogan.start("visible");
    await animateSlogan.start({
      height: "95%",
      duration: 500,
    });
    await setInterval(() => {
      setShowEmotive(true);
    }, 500);
    await setInterval(()=> {
      setHideFrontPageSVG(true)
      animateBanner.start("shrunk");
      setHideInvitation(false);
    }, 5000)
  };

  useEffect(() => {
    animate();
  }, []);

  const title = "TERMINAL TACKLE";
  const slogan = "What do you have at the end of your reel?";

  return (
    <motion.div className='banner-container'>
      <motion.div
        initial='full'
        variants={bannerVariants}
        animate={animateBanner}
        transition={{ duration: 2 }}
        className='banner'>
        <motion.div className='banner__title'>
          <motion.h2 className='banner__title'>
            {title.split("").map((char, i) => (
              <motion.span
                initial={{ color: "white", opacity: 1 }}
                transition={{
                  duration: 4
                }}
                custom={i}
                key={i}
                animate={animateTitle}>
                {char}
              </motion.span>
            ))}
          </motion.h2>
        </motion.div>

        <motion.h2
          className='banner__slogan'
          variants={sentenceVariants__slogan}
          initial='hidden'
          animate={animateSlogan}>
          {slogan.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.h2>

        <FrontPageSVG hide={hideFrontPageSVG} /> 
        <Waves />
          
        {!hideInvitation && <Invitation />}
        <RodSVG castRod={castRod} />

        

        {showEmotive && <Emotive animateSlogan={animateSlogan} />}
      </motion.div>
    </motion.div>
  );
};

export default Banner;
