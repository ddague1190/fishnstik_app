import "./frontpagebanner.styles.scss";
import React, { useRef, useEffect, useState } from "react";
import { motion, useCycle, useAnimation, AnimatePresence } from "framer-motion";
import { ReactComponent as SwivelSnap } from "./svg_helpers/swivelsnap.svg";
import Waves from "./Waves";
import Game2 from "../game/game2.component";
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
    duration: 3,
  },
});

const Banner = () => {
  const [showGame, toggleShowGame] = useCycle(false, true);
  const [castRod, setCastRod] = useState(false);
  const animateTitle = useAnimation();
  const animateBanner = useAnimation();
  const animateSpacer = useAnimation();
  const animateSwivelSnap = useAnimation();

  const spacerVariants = {
    full: {
      height: "40rem",
    },
    shrunk: {
      height: "20rem",
    },
  };
  const bannerVariants = {
    full: {},
    shrunk: {},
  };
  const swivelSnapVariants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

  const animate = async () => {
    setCastRod(true);
    animateTitle.start(titleToBlack);
    animateBanner.start("shrunk");
    animateTitle.start(titleToGone);
    animateBanner.start("shrunk");
    animateSpacer.start("shrunk");
    animateSwivelSnap.start("show");
  };

  useEffect(() => {
    animate();
  }, []);

  const title = "Win a free sample pack";
  const slogan = "What do you have at the end of your reel?";

  return (
    <motion.div className='banner-container'>
      <motion.div
        initial='full'
        variants={spacerVariants}
        animate={animateSpacer}
        transition={{ duration: 3 }}
        className='banner__spacer'></motion.div>
      <motion.div
        initial='full'
        variants={bannerVariants}
        animate={animateBanner}
        transition={{ duration: 4 }}
        className='banner'>
        <motion.h4 className='banner__title'>
          {title.split("").map((char, i) => (
            <motion.span
              initial={{ color: "white", opacity: 1 }}
              transition={{
                duration: 4,
              }}
              custom={i}
              key={i}
              animate={animateTitle}>
              {char}
            </motion.span>
          ))}
        </motion.h4>

        <Waves />

        <div className='invitation__container'>
          <motion.div
            onClick={() => {
              if (!showGame) toggleShowGame();
              return;
            }}
            initial='hidden'
            animate={animateSwivelSnap}
            variants={swivelSnapVariants}
            transition={{ delay: 2, duration: 1, type: "spring" }}
            className='invitation'>
            <div className='invitation__terms'>
              <h2>
                <strong>Click here</strong> to play the game
              </h2>
            </div>

            <SwivelSnap />

            {showGame && <Game2 toggleShowGame={toggleShowGame} />}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Banner;
