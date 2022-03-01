import "./featured.styles.scss";
import { m, motion, useCycle } from "framer-motion";
import Figure from "../../utilities/figure/figure.component";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const featuredProducts = {
  dolphin_snaps: {
    pics: 
    [
    "https://fishnwirepictures.s3.amazonaws.com/matolures1.jpeg",
    "https://fishnwirepictures.s3.amazonaws.com/matolures2.jpeg",
    "https://fishnwirepictures.s3.amazonaws.com/matolures.jpeg",
  ],
  title: 'FishNStik Dolphin Snaps',
  description: 'The finest tournament snaps. Handmade in West Palm Beach, FL.'
},
mato_lures: {
  pics: 
  [
  "https://fishnwirepictures.s3.amazonaws.com/matolures1.jpeg",
  "https://fishnwirepictures.s3.amazonaws.com/matolures2.jpeg",
  "https://fishnwirepictures.s3.amazonaws.com/matolures.jpeg",
],
title: 'Mato Lures - Small',
description: 'Handcrafted from fine materials, each one is unique. Let us know if you catch more fish with these. We certaintly have.'
}

};

const Product = ({product: {pics, title, description}}) => {
  const [currentPic, setCurrentPic] = useState({ pic: pics[0], index: 0 });

  const changePic = (index) => {
    setCurrentPic({
      pic: pics[index],
      index: index,
    });
  };
  return (
    <div className='featured__product'>
    <div className='featured__images'>
      <Figure image={currentPic.pic} animate height='30rem' />
      <div className='featured__image-selector'>
        {pics.map((_, index) => {
          return (
            <div
              key={index}
              onClick={() => changePic(index)}
              className={
                index === currentPic.index
                  ? "featured__image-selector-dot featured__image-selector-dot--active"
                  : "featured__image-selector-dot"
              }
            />
          );
        })}
      </div>
    </div>
    <div className='featured__text'>
      <Link to='/product/40'>
        <h3 className='featured__product-title'>{title}</h3>
      </Link>
      <p className='featured__product-description'>
        {description}
      </p>
    </div>
  </div>
  )
}


const Featured = () => {


  return (
    <div className='featured'>
      <h3 className='featured__title'>Featured products</h3>
      <Product product={featuredProducts['dolphin_snaps']} />
      <Product product={featuredProducts['mato_lures']} />

    </div>
  );
};
export default Featured;


