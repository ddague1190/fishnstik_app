import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useSelector } from "react-redux";

const Arrows = ({ crankRef, revealArrows }) => {

  const [location, setLocation] = useState({ x: "", y: "" });
  const { width } = useSelector((state) => state.dimensions);
  useEffect(() => {
    setLocation({
      x: crankRef.current.getBoundingClientRect().x,
      y: crankRef.current.getBoundingClientRect().y,
    });
  }, [width]);
  const xOffset = width > 820 ? 80 : 80;
  const yOffset = width > 820 ? 140 : 0;
  return (
    <div
      className='banner__arrows'
      style={{ top: location.y-yOffset, left: location.x-xOffset }}>
      <div className='banner__arrows--left'>
        <motion.i
          className='fa fa-chevron-left'
          aria-hidden='true'
          custom={0}
          animate={revealArrows}></motion.i>
        <motion.i
          className='fa fa-chevron-left'
          aria-hidden='true'
          custom={1}
          animate={revealArrows}></motion.i>
        <motion.i
          className='fa fa-chevron-left'
          aria-hidden='true'
          custom={2}
          animate={revealArrows}></motion.i>
      </div>
      <div className='banner__arrows--right'>
        <motion.i
          className='fa fa-chevron-right'
          aria-hidden='true'
          custom={0}
          animate={revealArrows}></motion.i>
        <motion.i
          className='fa fa-chevron-right'
          aria-hidden='true'
          custom={1}
          animate={revealArrows}></motion.i>
        <motion.i
          className='fa fa-chevron-right'
          aria-hidden='true'
          custom={2}
          animate={revealArrows}></motion.i>
      </div>
    </div>
  );
};

export default Arrows;
