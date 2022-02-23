import React from "react";
import { motion } from "framer-motion";

const QuestionmarkSVG = () => {
  return (
    <svg className='invitation__questionmark' xmlns='http://www.w3.org/2000/svg'  viewBox='0 -2 4.43 10.16'>
      <g id='Layer_2' data-name='Layer 2'>
        <g id='Layer_1-2' data-name='Layer 1'>
          <motion.path
                     initial={{y: 0}}
                     animate={{y: -.4}}
                     transition={{repeat: Infinity, repeatDelay: 0, type: 'tween', duration: 2}}
            className='questionmark-cls-1'
            d='M.09,1.7a.63.63,0,0,1,.07-.53A1.41,1.41,0,0,1,.59.6,1.85,1.85,0,0,1,1.79.05,1.59,1.59,0,0,1,3,.52a1.57,1.57,0,0,1,.43,1.13,1.64,1.64,0,0,1-.36.9c-.21.27-.41.33-.9.85a1,1,0,0,0-.21.26c-.18.37.06.63-.09.87A.63.63,0,0,1,1,4.64s-.06-.11,0-.48a2.62,2.62,0,0,1,.21-1.05,1.71,1.71,0,0,1,.38-.39c.42-.36.64-.34.79-.62a.7.7,0,0,0,.09-.51.74.74,0,0,0-.31-.47A.76.76,0,0,0,1.67,1a.75.75,0,0,0-.54.21c-.21.24,0,.49-.21.65A.61.61,0,0,1,.09,1.7Z'
          />
          <motion.path
            initial={{y: 0}}
            animate={{y: .1}}
            transition={{repeat: Infinity, type: 'tween', duration: 2, repeatDelay: 0}}
            className='questionmark-cls-1'
            d='M1.16,5.37a.46.46,0,0,0,0,.65A.45.45,0,0,0,1.7,6a.47.47,0,0,0,.17-.57A.48.48,0,0,0,1.16,5.37Z'
          />
        </g>
      </g>
    </svg>
  );
};

export default QuestionmarkSVG;
