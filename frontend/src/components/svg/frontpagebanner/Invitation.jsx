import React, { useState } from "react";
import { motion, AnimatePresence, useCycle, useAnimation } from "framer-motion";
import Game2 from "../game/game2.component";
import { ReactComponent as SwivelSnap } from "./svg_helpers/swivelsnap.svg";

const Invitation = ({animateSwivelSnap}) => {
  const [showGame, toggleShowGame] = useCycle(false, true);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={animateSwivelSnap}
      transition={{ duration: 1 }}
      className='invitation'>
        
    <h5 className="invitation__terms">Reel it in  & win a sample pack* </h5>
      <SwivelSnap />

      <button className='button invitation__button' onClick={toggleShowGame}>
        Play the game
      </button>
      {showGame && <Game2 toggleShowGame={toggleShowGame} />}
    </motion.div>
  );
};

export default Invitation;
