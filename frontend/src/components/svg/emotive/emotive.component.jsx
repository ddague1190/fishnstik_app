import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useCycle,
  useAnimation,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import styled from "./emotive.module.scss";
import { useSelector } from "react-redux";
import { ReactComponent as WavySurface } from "./waveysurface.svg";

const Emotive = ({ animateSlogan }) => {
  // const { width } = useSelector((state) => state.dimensions);
  // const [startShow, setStartShow] = useState(false);
  // const fadeIn = useAnimation();
  // const { scrollYProgress } = useViewportScroll();
  // const [hookedPosition, setHookedPosition] = useState(0);
  // const [reverse, setReverse] = useState(false);
  // const frame = useTransform(
  //   scrollYProgress,
  //   [0.05, 0.12, 0.16, 0.2, 0.23, 0.28],
  //   [12, 115, 217, 319, 425, 530]
  // );
  // const frameMobile = useTransform(
  //   scrollYProgress,
  //   [0, 0.04, 0.08, 0.1, 0.14, 0.18],
  //   [30, 132, 235, 338, 440, 550]
  // );
  // const reverseFrame = useTransform(
  //   scrollYProgress,
  //   [0.26, 0.22, 0.16, 0.12, 0.08, 0.05],
  //   [30, 132, 235, 338, 440, 550]
  // );

  // const scaleContainer = useTransform(scrollYProgress, [0, 0.5], [1, 0.25])
  // useEffect(() => {
  //   if (scrollYProgress.current < 0.02) {
  //     setReverse(false);
  //   }
  //   if (scrollYProgress.current > 0.5) {
  //     setReverse(true);
  //   }
  //   scrollYProgress.onChange((value) => setHookedPosition(value));

  //   return () => {
 
  //   }
  // }, [scrollYProgress, hookedPosition]);

  return (
    <div className={styled.wrapper}>
      <div className={styled.wrapper__wavysurface}>
        <WavySurface />
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: 10 }}
          transition={{ duration: 4, repeat: Infinity }}
          className={styled.wrapper__underwater}></motion.div>
      </div>
    </div>
  );
};

export default Emotive;
