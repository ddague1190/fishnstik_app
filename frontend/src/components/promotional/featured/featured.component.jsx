import "./featured.styles.scss";
import { motion, useCycle } from "framer-motion";
import Figure from "../../utilities/figure/figure.component";
import { useEffect, useState } from "react";

const Featured = () => {
  const pics = [
    "https://fishnwirepictures.s3.amazonaws.com/matolures.jpeg",
    "https://fishnwirepictures.s3.amazonaws.com/matolures1.jpeg",
    "https://fishnwirepictures.s3.amazonaws.com/matolures2.jpeg",
  ];
  const [currentPic, setCurrentPic] = useState({ pic: pics[0], index: 0 });

  const [currPic, cycleThrough] = useCycle(...pics);
  const changePic = (forward) => {
    let newIndex = forward ? currentPic.index + 1 : currentPic.index - 1;
    setCurrentPic({
      pic: pics[newIndex],
      index: newIndex,
    });
  };

  return (
    <div className='featured'>
      <span className='featured__title tab-group__tab--active'>Featured Products</span>
      <svg
        height='300px'
        className='featured__svg'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 506.97 447.16'>
        <g id='Layer_2' data-name='Layer 2'>
          <g id='Layer_1-2' data-name='Layer 1'>
            <path
              class='cls-1'
              d='M214.79,444.79l288.86,1.87L506.46,1.93c-15.87,28.28-34.88,88.6-89.29,98.81-55.82,10.49-79.54-16.62-130.36-1.37-101.3,30.39-123.67,72.84-135.53,103.34C137.48,238.19,35.6,246.17.5,314.52L1.33,443.1Z'
            />
          </g>
        </g>
      </svg>
      <div className='featured__product'>
        <Figure image={currPic} animate height='30rem' />
        <span
          className='fishfacts__image-right featured__chevron'
          onClick={cycleThrough}>
          <i className='fa-solid fa-chevron-right'></i>
        </span>
        <h3>Mato Lures</h3>
      </div>
      <div className='featured__product'>
        <Figure image={currPic} animate height='30rem' />
        <span
          className='fishfacts__image-right featured__chevron'
          onClick={cycleThrough}>
          <i className='fa-solid fa-chevron-right'></i>
        </span>
        <h3>Mato Lures</h3>
      </div>
    </div>
  );
};
export default Featured;
