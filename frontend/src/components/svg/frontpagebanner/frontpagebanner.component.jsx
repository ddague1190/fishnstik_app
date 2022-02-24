import "./frontpagebanner.styles.scss";
import React, { useRef, useEffect, useState } from "react";
import { motion, useCycle, useAnimation, AnimatePresence } from "framer-motion";
import FrontPageSVG from "./FrontPageSVG";
import RodSVG2 from "./RodSVG";
import Game2 from "../game/game2.component";
import Emotive from "./Emotive";
import { ReactComponent as SwivelSnap } from "./svg_helpers/swivelsnap.svg";
import {
  sentenceVariants,
  letterVariants,
  sentenceVariants__slogan,
} from "../../../utils/variants";

const Banner = () => {
  const [animationEnded, setAnimationEnded] = useState(false);
  const [showGame, toggleShowGame] = useCycle(false, true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [castRod, setCastRod] = useState(false);
  const [showRod, setShowRod] = useState(true);
  const [showEmotive, setShowEmotive] = useState(false);

  const setRef = useRef();
  const animateTitle = useAnimation();
  const animateSlogan = useAnimation();
  const animateFatherSon = useAnimation();
  const animateSwivelSnap = useAnimation();

  const animate = async () => {
    setShowRod(true);
    setCastRod(true);
    await animateTitle.start("visible");
    await animateSlogan.start("visible");
    await animateSlogan.start({
      height: "90%",
      duration: 2,
    });
    await setInterval(() => {
      setShowEmotive(true);
    }, 500);

    await setInterval(() => {
      setAnimationEnded(true)
    }, 3000);
  };

  useEffect(() => {
    animate();
  }, []);

  const title = "TERMINAL TACKLE";
  const slogan = "It's all about what's at the end of our reel";

  return (
    <div className='banner'>

    {!animationEnded && 
      <motion.div className='banner__title'>
        <motion.h2
          className='banner__title'
          variants={sentenceVariants}
          initial='hidden'
          animate={animateTitle}>
          {title.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.h2>
      </motion.div>
      }

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

      {!animationEnded ? (
        <FrontPageSVG />
      ) : (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 1}}
        className='invitation'>
          <SwivelSnap />

        <button onClick={toggleShowGame}>playthegame</button>
        </motion.div>
      )}

      {!animationEnded && 
      (showRod && <RodSVG2 castRod={castRod} />)
      }
          {showGame && <Game2 toggleShowGame={toggleShowGame} />}


      {showEmotive && <Emotive animateSlogan={animateSlogan} />}
      {/* <FatherSonSVG animateFatherSon={animateFatherSon} /> */}
    </div>
  );
};

export default Banner;
