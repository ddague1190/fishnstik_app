import "./featured.styles.scss";
import { m, motion, useCycle } from "framer-motion";
import Figure from "../../utilities/figure/figure.component";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const featuredProducts = {
  dolphin_snaps: {
    pics: [
      "https://fishnwirepictures.s3.amazonaws.com/IMG-5470.jpg",
      "https://fishnwirepictures.s3.amazonaws.com/Screen+Shot+2022-03-07+at+7.14.38+PM.png",
      "https://fishnwirepictures.s3.amazonaws.com/Screen+Shot+2022-03-07+at+7.09.49+PM.png",
    ],
    title: "REEL World 10inch Flying Fish",
    description:
      "10 Inch Swim Bait, 5.8 ounces, NEW Stabilization Lip, allows live-swim-action from 1 to 17 Knots!",
    to: "/product/40",
  },
  mato_lures: {
    pics: ["https://fishnwirepictures.s3.amazonaws.com/SSS.jpg"],
    title: "FishNStik Sail Snaps",
    description:
      "The finest tournament snaps. Handmade in West Palm Beach, FL.",
    to: "/product/43",
  },
};

const Product = ({ product: { pics, title, description, to } }) => {
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

        {pics.length > 1 && (
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
        )}
      </div>
      <div className='featured__text'>
        <Link to={to}>
          <h3 className='featured__product-title'>{title}</h3>
        </Link>
        <p className='featured__product-description'>{description}</p>
      </div>
    </div>
  );
};

const Featured = () => {
  return (
    <div className='featured'>
      <h1 className='featured__title'>Featured products</h1>
      <Product product={featuredProducts["dolphin_snaps"]} />
      <Product product={featuredProducts["mato_lures"]} />
    </div>
  );
};
export default Featured;
