import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { motion, useCycle, useMotionValue } from "framer-motion";
import styled from "./game.module.scss";
import { useSelector } from "react-redux";
import useForceUpdate from "../../../utils/forceUpdate";


const Game2 = ({ toggleShowGame }) => {
  // state
  const forceUpdate = useForceUpdate();
  const { width } = useSelector((state) => state.dimensions);
  const [setpoint, setSetpoint] = useState(124);
  const [boxCenterPoint, setBoxCenterPoint] = useState({});

  //framer variables
  const framerSetpoint = useMotionValue(setpoint);
  const framerRPM = useMotionValue(0);
  const framerDeg = useMotionValue(0);

  //ref
  const progressCircle = useRef();
  const targetCircle = useRef();
  const crankRef = useRef();
  const gameRef = useRef();

  //methods
  const closeGame = (e) => {
    if (e.target.closest("#game")) return;
    toggleShowGame();
  };

  useEffect(() => {
    document.body.addEventListener("click", closeGame, false);

    const { left, top, width, height } =
      crankRef.current.getBoundingClientRect();
    // get the current center point
    const boxCenterX = left + width / 2;
    const boxCenterY = top + height / 2;

    // update the state
    setBoxCenterPoint({ x: boxCenterX, y: boxCenterY });

    return () => {
      document.body.removeEventListener("click", closeGame);
      mouseUpHandler();
    };
  }, [width]);

  const getCurrentRotation = () => {
    try {
      const str = crankRef.current.style.transform;
      const value = str.match(/\d/g).join("");
      return parseInt(value);
    } catch {
      return 0;
    }
  };

  const timingFunction = (revolutions) => {
    const t0 = Date.now();
    const deg0 = framerDeg.get();

    setTimeout(() => {
      const dt = Date.now() - t0;
      const dDeg = framerDeg.get() - deg0;
      const RPM = ((dDeg / dt) * 60 * 1000) / 360;
      //2.06 correction factor for SVG gauge
      framerRPM.set(RPM > 120 ? 250 : RPM > 0 ? RPM * 2.06 : 0);
    }, 1000);
  };

  //   const autonomousRotate = (speed) => {
  //     let count = 0;
  //     let revolutions;
  //     let prevDeg;
  //     let newDeg = 0;
  //     setInterval(() => {
  //       prevDeg = newDeg;
  //       newDeg = (newDeg + speed) % 360;
  //       if (newDeg < prevDeg) {
  //         revolutions += 1;
  //       }
  //       crankRef.current.style.transform = `rotate(${newDeg}deg)`;
  //     }, 80);

  //     setInterval(() => {
  //       timingFunction(revolutions);
  //     }, 2000);
  //   };

  const getDegrees = (mouseX, mouseY) => {
    const radians = Math.atan2(
      mouseX - boxCenterPoint.x,
      mouseY - boxCenterPoint.y
    );
    const degrees = Math.round(radians * (180 / Math.PI) * -1);
    return degrees;
  };

  const mouseUpHandler = () => {
    console.log("mouseup");
    gameRef.current?.removeEventListener("mousemove", mouseMoveHandler, false);
    // setBoxCenterPoint(0)
    framerDeg.set(0);
    forceUpdate();
    crankRef.current.style.transform = "rotate(0deg)";
  };

  const mouseDownHandler = (e) => {
    console.log("mousedown");
    const clickDegrees = getDegrees(e.pageX, e.pageY);
    gameRef.current.addEventListener("mousemove", mouseMoveHandler, false);
    gameRef.current.clickDegrees = clickDegrees;
    setInterval(() => {
      timingFunction();
    }, 1500);
  };

  const mouseMoveHandler = (e) => {
    console.log("mousemove");
    let previousDegree = getCurrentRotation();
    let degrees = getDegrees(e.pageX, e.pageY) - e.currentTarget.clickDegrees;
    if (degrees < 0) degrees = degrees + 360;
    framerDeg.set(
      framerDeg.get() +
        degrees -
        (degrees < previousDegree ? 0 : previousDegree)
    );
    crankRef.current.style.transform = `rotate(${degrees}deg)`;
  };

  return ReactDOM.createPortal(
    <div
      ref={gameRef}
      onMouseUp={mouseUpHandler}
      className={styled.game}
      id='game'>
      <svg
        className={styled.game__title}
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
      <div
        onMouseDown={mouseDownHandler}
        ref={crankRef}
        className={styled.crank}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 478.25 500.85'>
          <g id='crank__Layer_2' data-name='Layer 2'>
            <g id='crank__Layer_1-2' data-name='Layer 1'>
              <path 
                className={styled.crank__cls1}
                d='M130.3 96.44l24.34-16c15.08 31.72 57.62 14.27 49.83-18.24l28.93-3.33c-.63 34 44.74 40.27 52.08 6.81a157.8 157.8 0 0127.12 10c-1.72 5.79-3.39 11.33-2.36 17.3a4.74 4.74 0 01-1.46 4.6q-19.47 19.68-38.9 39.42c-23.39 23.75-46.85 47.42-70.13 71.29-18.68 18.38-22.74 50.12-9.34 72.92 19 33.58 64.46 38.37 89.19 10.24q46.71-51 93.53-102c18.94-22.84 10.59-6.63 32.73-15.68q4.72 14.28 9.39 28.4c-29.75 7.72-28.52 50.87 2.19 55.35 3 .5 3.26.53 3 3.91-.75 8.84-1.25 17.72-3.31 26.37-31.21-6.58-46.35 34.62-17.06 52.53L384.71 366c-25.23-21.42-57.3 10.63-37.52 39.06L323 421.2c-13.93-30.26-55.72-17.15-50.12 17.29-3.25 1.71-23.77 4.14-28.72 3.34-.06-31.73-41.58-40.91-52.41-5.66l-27.16-10.09c14-28.39-20.52-57.35-44.53-29.71l-20.45-21.53c24.54-19.56 4.61-61.19-27.85-47.11l-9.44-28.52c31.75-7.6 27.28-55.13-5.78-55.47l3.26-29.87c31.15 6.49 47.52-34.31 18-52.57 5-8.46 10-17 15.13-25.81C118.39 157 150 124.71 130.3 96.44z'
              />
              <path d='M238.28 302.14c-23.58.07-44.9-19.85-47.54-44-2.49-18.26 3.28-33.22 15.64-45.79Q275.49 142 344.58 71.72c33-27.13 71.89-102 119.31-58.38 44.11 51.57-34.43 95.56-61.82 133.57-43.23 46.88-86.13 94.1-129.51 140.83-9.28 9.61-20.68 14.12-34.28 14.4zm.6-16c44.11-.17 43.91-70.84-.12-70.91-44.28.93-44.27 70.21.12 70.93zM404.41 46.38c.07 40.06 57.52 38.72 57.55.12-.68-39.67-57.05-40.73-57.55-.12z' />
              <path
                className={styled.crank__cls2}
                d='M238.88 286.16c-44.4-.72-44.4-70-.11-70.91 44.02.08 44.23 70.75.11 70.91zM404.41 47.64c.51-40.64 56.87-39.55 57.59.12-.08 38.6-57.52 39.93-57.59-.12z'
              />
              <path
                className={styled.crank__cls1}
                d='M131.49 96.82l24.35-16c15.08 31.72 57.62 14.27 49.82-18.24l28.94-3.34c-.63 34 44.74 40.28 52.08 6.82a158 158 0 0127.11 10c-1.71 5.79-3.39 11.33-2.35 17.3a4.79 4.79 0 01-1.46 4.6q-19.49 19.68-38.9 39.42c-23.39 23.75-46.86 47.42-70.13 71.29-18.68 18.38-22.74 50.12-9.34 72.92 19 33.58 64.46 38.37 89.18 10.24q46.72-51 93.53-102c18.95-22.84 10.6-6.63 32.74-15.69q4.72 14.29 9.39 28.41c-29.76 7.72-28.52 50.87 2.19 55.35 3 .5 3.26.53 3 3.91-.76 8.84-1.26 17.72-3.32 26.37-31.21-6.58-46.34 34.62-17.06 52.53l-15.39 25.7C360.67 345 328.6 377 348.38 405.43l-24.22 16.15c-13.93-30.26-55.73-17.15-50.12 17.29-3.25 1.71-23.77 4.14-28.72 3.34-.07-31.73-41.58-40.92-52.41-5.66l-27.16-10.09c14-28.39-20.52-57.35-44.54-29.71l-20.4-21.53c24.54-19.56 4.61-61.22-27.81-47.11-3.12-9.45-6.25-18.91-9.43-28.52 31.74-7.6 27.28-55.13-5.78-55.47L61 214.25c31.14 6.49 47.52-34.31 18-52.57 5-8.46 10-17 15.14-25.81 25.44 21.51 57.05-10.78 37.35-39.05z'
              />
              <path d='M239.48 302.52c-23.59.07-44.91-19.85-47.54-44-2.49-18.26 3.27-33.22 15.63-45.79q69.12-70.29 138.21-140.6c33-27.13 71.89-102 119.3-58.38 44.09 51.57-34.42 95.56-61.82 133.56-43.26 46.86-86.13 94.08-129.51 140.81-9.28 9.61-20.67 14.12-34.27 14.4zm.59-16c44.12-.17 43.91-70.84-.11-70.91-44.29.93-44.27 70.21.11 70.93zM405.6 46.76c.08 40.06 57.52 38.72 57.55.12-.68-39.67-57.04-40.73-57.55-.12z' />
              <path
                className={styled.crank__cls2}
                d='M240.07 286.54c-44.39-.73-44.39-70-.11-70.91 44.04.08 44.22 70.74.11 70.91zM395.69 44.43c.64-50.25 74.16-48.88 75 .15 0 47.69-74.89 49.42-75-.15z'
              />
              <path
                className={styled.crank__cls1}
                d='M313.7 74.77c-14 28.38 20.52 57.34 44.53 29.7L378.64 126c-24.54 19.55-4.61 61.19 27.85 47.1l9.44 28.52c-31.75 7.61-27.28 55.13 5.78 55.47L418.45 287c-31.15-6.49-47.52 34.32-18 52.57-5 8.47-10 17-15.13 25.81-25.5-21.5-57.1 10.78-37.41 39.06l-24.34 16c-15.08-31.71-57.63-14.26-49.83 18.24L244.85 442c.63-34-44.74-40.28-52.08-6.81a159.49 159.49 0 01-27.12-10c1.72-5.79 3.39-11.33 2.36-17.31a4.74 4.74 0 011.46-4.6q19.47-19.68 38.9-39.42c23.39-23.74 46.85-47.41 70.13-71.29 18.68-18.37 22.74-50.11 9.34-72.91-19-33.59-64.46-38.37-89.19-10.25q-46.71 51-93.53 102c-18.94 22.84-10.59 6.63-32.73 15.68q-4.73-14.3-9.39-28.41c29.75-7.72 28.52-50.87-2.19-55.34-3-.5-3.26-.53-3-3.92.75-8.84 1.25-17.72 3.31-26.36 31.21 6.57 46.35-34.63 17.06-52.53 5.06-8.44 10.13-16.92 15.4-25.7 25.23 21.41 57.3-10.63 37.52-39.07'
              />
              <path d='M240 198.71c23.58-.08 44.9 19.84 47.54 44C290 261 284.23 276 271.87 288.52q-69.1 70.29-138.2 140.61c-33 27.13-71.89 102-119.31 58.37-44.09-51.56 34.43-95.56 61.82-133.56 43.23-46.88 86.13-94.1 129.51-140.84 9.31-9.6 20.68-14.1 34.31-14.39zm-.6 16c-44.11.18-43.91 70.85.12 70.91 44.25-.94 44.24-70.22-.15-70.94zM73.84 454.46c-.07-40-57.52-38.72-57.55-.12.71 39.66 57.05 40.74 57.55.12z' />
              <path
                className={styled.crank__cls2}
                d='M239.37 214.68c44.4.73 44.4 70 .11 70.91-44.02-.07-44.22-70.74-.11-70.91zM73.84 453.21c-.51 40.62-56.87 39.54-57.55-.12.04-38.61 57.48-39.93 57.55.12z'
              />
              <path
                className={styled.crank__cls1}
                d='M312.5 74.39c-14 28.38 20.52 57.34 44.54 29.7l20.4 21.54c-24.54 19.55-4.61 61.19 27.86 47.11 3.12 9.45 6.25 18.9 9.43 28.51-31.74 7.61-27.28 55.13 5.78 55.47l-3.26 29.87c-31.14-6.49-47.52 34.32-17.95 52.57-5 8.47-10 17-15.14 25.81-25.49-21.5-57.1 10.78-37.4 39.06l-24.35 16c-15.08-31.71-57.62-14.26-49.82 18.24l-28.94 3.34c.63-34-44.74-40.28-52.08-6.81a158.85 158.85 0 01-27.11-10c1.71-5.79 3.39-11.33 2.35-17.31a4.79 4.79 0 011.46-4.6q19.48-19.67 38.9-39.42c23.39-23.74 46.86-47.41 70.13-71.29 18.7-18.34 22.7-50.08 9.34-72.88-19-33.59-64.46-38.37-89.18-10.25q-46.72 51-93.53 102c-19 22.84-10.6 6.63-32.74 15.68l-9.39-28.41c29.76-7.72 28.52-50.87-2.19-55.34-3-.5-3.26-.53-3-3.92.76-8.83 1.26-17.72 3.32-26.36 31.21 6.57 46.34-34.63 17.06-52.53l15.39-25.7c25.24 21.41 57.31-10.63 37.53-39.07'
              />
              <path d='M238.77 198.33c23.59-.08 44.91 19.84 47.54 44 2.49 18.27-3.27 33.22-15.63 45.79q-69.12 70.31-138.21 140.61c-33 27.13-71.89 102-119.3 58.37-44.09-51.54 34.42-95.54 61.83-133.54 43.23-46.88 86.13-94.1 129.51-140.84 9.27-9.6 20.66-14.11 34.26-14.39zm-.59 16c-44.12.18-43.91 70.85.11 70.91 44.29-.94 44.27-70.24-.11-70.94zM72.65 454.08C72.57 414 15.13 415.36 15.1 454c.68 39.64 57.04 40.7 57.55.08z' />
              <path
                className={styled.crank__cls2}
                d='M238.18 214.3c44.39.73 44.39 70 .11 70.92-44.03-.08-44.22-70.75-.11-70.92zM72.65 452.83c-.51 40.62-56.88 39.55-57.55-.12.03-38.6 57.48-39.93 57.55.12z'
              />
              <path
                className={styled.crank__cls2}
                d='M7.64 454.11c.64-50.25 74.15-48.88 75 .15-.01 47.74-74.9 49.44-75-.15z'
              />
            </g>
          </g>
        </svg>
      </div>

      <div className={styled.game__console}>
        <div className={styled.game__instructions}>
          <h1>Reel console</h1>
          <h2>Rules</h2>
          <ul>
            <li>
              <h4>- Spin the crank to match speed to target speed</h4>
            </li>
            <li>
              <h4>- Hold until fish is caught</h4>
            </li>
          </ul>
        </div>
        <div className={styled.gauges}>
          <svg
            className={styled.RPMgauge}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 287.61 246.99'>
            <defs>
              <linearGradient
                id='Orange_Yellow'
                data-name='Orange, Yellow'
                x1='58.27'
                y1='82.25'
                x2='125.36'
                y2='82.25'
                gradientUnits='userSpaceOnUse'>
                <stop offset='0' stopColor='#fff33b' />
                <stop offset='0.04' stopColor='#fee72e' />
                <stop offset='0.12' stopColor='#fed51b' />
                <stop offset='0.2' stopColor='#fdca10' />
                <stop offset='0.28' stopColor='#fdc70c' />
                <stop offset='0.67' stopColor='#f3903f' />
                <stop offset='0.89' stopColor='#ed683c' />
                <stop offset='1' stopColor='#e93e3a' />
              </linearGradient>
            </defs>
            <motion.path
              className={styled.RPMgauge__setpoint}
              initial={{
                pathOffset: 130,
                opacity: 0,
              }}
              animate={{
                pathOffset: 0,
                opacity: 1,
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
              style={{
                //134.1857147216797
                rotate: framerSetpoint,
                originX: "122.78px",
                originY: "134.48px",
              }}
              // stroke= url(#Orange_Yellow)
              stroke='green'
              strokeMiterlimit='10'
              strokeWidth='6'
              d='M122.78 134.48L10.85 208.49'
            />
            <path
              d='M199.5 60.62a108.45 108.45 0 00-148.72-1.28c-40.11 37.13-44.3 94.37-20 134.75a.86.86 0 001.17.3l20.75-12.08a.85.85 0 00.31-1.18L52 179.29a.87.87 0 00-1.17-.3l-13.48 7.73a.87.87 0 01-1.24-.43l-7.54-18.61 4.2-1.68c-.38-1.44-.73-3-1.14-4.41l-3.55.93a.87.87 0 01-1.08-.73c-.82-6.49-1.6-12.63-2.41-19-.06-.51.34-1 .85-.64h15.21a2.46 2.46 0 00.69-1.19v-3a.85.85 0 00-.86-.85H25.23a.86.86 0 01-.86-.93c.54-6.83.89-13.42 2.8-19.81a.9.9 0 011.07-.59l1.87.49.12-.37v0a5.41 5.41 0 01.16-1.08 21.86 21.86 0 01.34-2.56l-1.9-.52a.86.86 0 01-.57-1.17L36 92a.88.88 0 011.24-.42l13.42 7.77a.86.86 0 001.17-.3L53 97a.85.85 0 00-.32-1.16L39.17 88a.88.88 0 01-.26-1.29c4.16-5.38 8.17-10.59 12.52-16.23a.88.88 0 011.32-.07l.9 1H54c.69-.66 1.36-1.34 2-2a5.73 5.73 0 01.44-.52l-1-1a.87.87 0 01.07-1.31L71.4 54.24a.87.87 0 011.28.25l7.8 13.39a.86.86 0 001.19.3l2-1.24a.86.86 0 00.3-1.16l-7.7-13.41a.87.87 0 01.42-1.25l18.62-7.72a.87.87 0 011.17.57l1 .64c1.07-.38 2.06-.83 3.07-1.19 0-.15-.08-.33-.14-.54a.86.86 0 01.73-1.07l20.17-2.6a.86.86 0 011 .85v15.25a.85.85 0 00.86.86h2.28a.86.86 0 00.86-.86V40a.87.87 0 011-.86l19.87 2.52a.88.88 0 01.73 1.09l-.32 1.25h.1a19.86 19.86 0 013.52 1.51l.18.09.49-1.81a.87.87 0 011.17-.57l18.62 7.65a.86.86 0 01.43 1.23l-7.7 13.41a.87.87 0 00.32 1.18l2 1.13a.85.85 0 001.17-.31l7.77-13.4a.87.87 0 011.28-.25l16.29 12.49a.88.88 0 01.07 1.33l-2 1.9v.16a5.12 5.12 0 011.42 1 4.59 4.59 0 011 1.41c.69-.69 1.37-1.38 2.07-2.1a.88.88 0 011.31.08l12.41 16.07a.87.87 0 01-.26 1.29l-13.41 7.75a.86.86 0 00-.31 1.18l1.16 2a.86.86 0 001.17.31l13.23-7.57a.87.87 0 011.22.38c1.35 2.82 2.72 5.51 3.87 8.28 1.38 3.3 2.58 6.69 3.89 10.2a.87.87 0 01-.59 1.15l-3.16.85c.44 1.25.81 2.51 1.16 3.78l.13.08 3.09-.82a.86.86 0 011.08.72c.91 6.85 1.78 13.5 2.69 20.43a.87.87 0 01-.85 1H208.2a.85.85 0 00-.86.85v3s.43.86.9.11h15.34c.53.75.92 1.22.85 1.73-.91 6.76-1.78 13.19-2.67 19.81a.88.88 0 01-1.09.72l-3.61-1c-.08.19-.17.37-.27.56a23.43 23.43 0 00-1.3 3.25l4.12 1.16a.87.87 0 01.56 1.17c-2.68 6.29-5.24 12.27-7.87 18.44a.86.86 0 01-1.23.41l-13.35-7.71a.86.86 0 00-1.16.29l-1.23 2.05a.86.86 0 00.31 1.19l20.77 11.88a.86.86 0 001.16-.29c24.05-38.33 21.83-96.15-18.07-134.21z'
              fill='none'
              stroke='#000'
              strokeWidth='.75'
              strokeMiterlimit='10'
            />
            <motion.path
              style={{
                rotate: framerRPM,
                originX: "122.78px",
                originY: "134.48px",
              }}
              d='M56.1 178.26s34.82-17.53 47.35-22.85c8.5-3.61 16.9-7.51 25.32-11.32a9.15 9.15 0 004.81-5.71 14.24 14.24 0 00-3.2-14.28c-3.69-3.83-8.56-4.73-12.54-1.91-3.68 2.6-7.22 5.45-10.67 8.43zm64.76-36.67a7.49 7.49 0 01-7.32-6.24 8 8 0 013.9-8.13c5.42-3.27 11.43 1.42 11.27 6.83a7.55 7.55 0 01-7.85 7.54z'
              fill='#ed1c24'
              stroke='#ed1c24'
              strokeMiterlimit='10'
            />
            <text
              className={styled.RPMgauge__cls4}
              transform='translate(0 208.49)'>
              0
            </text>
            <text
              transform='translate(95.01 194.97)'
              fontSize='29'
              fill='#231f20'
              fontFamily='Arvo'>
              RPM
            </text>
            <text
              className={styled.RPMgauge__cls4}
              transform='translate(107.21 24.36)'>
              60
            </text>
            <text
              className={styled.RPMgauge__cls4}
              transform='translate(225.23 204.5)'>
              120
            </text>
          </svg>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Game2;
