import "./frontpagebanner.styles.scss";
import React, { useRef, useEffect, useState } from "react";
import { motion, useCycle, useAnimation, AnimatePresence } from "framer-motion";
import FrontPageSVG from "./FrontPageSVG";
import HandleSVG from "./HandleSVG";
import Arrows from "./Arrows";
import FatherSonSVG from "./FatherSonSVG";
import RodSVG from "./RodSVG";
import RodSVG2 from "./RodSVG";
import Game2 from "../game/game2.component";
import QuestionmarkSVG from "./QuestionmarkSVG";

const Banner = () => {
  const [showGame, toggleShowGame] = useCycle(false, true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [castRod, setCastRod] = useState(false);
  const setRef = useRef();
  const revealPrize = useAnimation();
  const animate = async () => {
    setIsAnimating(true);
    setCastRod(true);
    await setTimeout(() => {
      toggleShowGame(true);
    }, 1500);
  };

  return (
    <div className='banner'>
      <svg
        className='banner__title'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 29.7 8.84'>
        <g id='Layer_2' data-name='Layer 2'>
          <g id='Layer_1-2' data-name='Layer 1'>
            <text
              className='title-cls-1'
              transform='translate(0.2 4.96) rotate(16.63)'>
              R
              <tspan className='title-cls-2' x='3.29' y='0'>
                ee
              </tspan>
              <tspan x='9.07' y='0'>
                l
              </tspan>
            </text>
            <text className='title-cls-3' transform='translate(13.35 7.1)'>
              it out
            </text>
            <text /> <text />
          </g>
        </g>
      </svg>
      {!isAnimating && (
        <div onClick={animate} className='invitation'>
          <span className='invitation__title'>Play another round!</span>
          <QuestionmarkSVG />
        </div>
      )}
      <FrontPageSVG />
      <RodSVG2 castRod={castRod} />

      {showGame && (
          <Game2 toggleShowGame={toggleShowGame} />
      )}

      {/* <FatherSonSVG revealPrize={revealPrize} /> */}
    </div>
  );
};

export default Banner;
