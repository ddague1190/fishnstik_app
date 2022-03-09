import "./featured.styles.scss";
import { motion, useCycle } from "framer-motion";
import Figure from "../../utilities/figure/figure.component";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const featuredProducts = {
  liveoceanlures: {
    pics: [
      "https://fishnwirepictures.s3.amazonaws.com/IMG-5470.jpg",
      "https://fishnwirepictures.s3.amazonaws.com/Mullet.jpg",
      "https://fishnwirepictures.s3.amazonaws.com/Ballyhoo-9.21.jpg",
      "https://fishnwirepictures.s3.amazonaws.com/FlyingFish.jpg",
    ],
    title: "LIVE OCEAN Big Game Fishing Lures ",
    description:
      "10in Swim Bait. Live-swim-action from 1 to 17 Knots! Available in 3 models with or without the stainless dredge.",
    to: "/product/45",
    videos: [
      {
        title: "Thank you Matt!",
        video: "https://www.youtube.com/embed/1v3HXjx36MI",
      },
      {
        title: "Slower speeds in action",
        video: "https://www.youtube.com/embed/UsVd1aQwvDY",
      },
      {
        title: "Dredge in action!",
        video: "https://www.youtube.com/embed/Ax9jyc023tk",
      },
    ],
  },
  dolphinsnaps: {
    pics: ["https://fishnwirepictures.s3.amazonaws.com/SSS.jpg"],
    title: "FishNStik Sail Snaps",
    description:
      "The finest tournament snaps. Handmade in West Palm Beach, FL.",
    to: "/product/43",
  },
};

const featuredVideos = {};

const Product = ({ product: { pics, title, description, to, videos } }) => {
  const [currentPic, setCurrentPic] = useState({ pic: pics[0], index: 0 });
  const changePic = (index) => {
    setCurrentPic({
      pic: pics[index],
      index: index,
    });
  };
  return (
    <div className='featured__product'>
      {/* <div className="featured__watchvideo">Video</div> */}
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

        <div className='featured__videos'>
          {videos &&
            videos.map((item, index) => {
              return (
                <MinVidBox
                  video={item.video}
                  title={item.title}
                  key={index}
                  index={index + 1}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

const Featured = () => {
  return (
    <div className='featured'>
      <span className='featured__title'>Featured products</span>
      <Product product={featuredProducts["liveoceanlures"]} />
      <Product product={featuredProducts["dolphinsnaps"]} />
    </div>
  );
};
export default Featured;

const variants = {
  open: { scale: 1 },
  closed: { scale: 0.2 },
};

export const MinVidBox = ({ index, title, video }) => {
  const [isOpen, setOpen] = useState(false);

  const onOpenClick = () => {
    setOpen(!isOpen);
    console.log("hi");
  };

  return (
    <div >
      <div className='video__index'>Video {index}</div>
      <motion.div
        variants={variants}
        animate={isOpen ? "open" : "closed"}
        className='featured__video'
        transition={{ duration: 0.3 }}
        onClick={onOpenClick}>
        <div className='video'>
          <iframe className='video__iframe' title={title} src={video}></iframe>
          <h5>{title}</h5>
        </div>
      </motion.div>
    </div>
  );
};
