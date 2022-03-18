import { createPortal } from "react-dom";
import "./featured.styles.scss";
import { motion, useCycle, useMotionValue, useTransform } from "framer-motion";
import { useSelector } from "react-redux";
import Figure from "../../utilities/figure/figure.component";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Waves from "../../svg/frontpagebanner/Waves";

const featuredProducts = {
  liveoceanlures: {
    pics: [
      "https://fishnwirepictures.s3.amazonaws.com/Mullet.jpg",
      "https://fishnwirepictures.s3.amazonaws.com/IMG-5470.jpg",
      "https://fishnwirepictures.s3.amazonaws.com/Ballyhoo-9.21.jpg",
      "https://fishnwirepictures.s3.amazonaws.com/FlyingFish.jpg",
    ],
    title: " Big Game Fishing Lures ",
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
    title: "Tournament Snaps",
    description:
      "The finest tournament snaps. Handmade in West Palm Beach, FL.",
    to: "/products/snaps/fishnstik/",
  },
};

const featuredVideos = {};

const FeaturedCard = ({ children, image, title }) => {
  const ref = useRef();
  const { width } = useSelector((state) => state.dimensions);
  const onClickHandler = () => {
    ref.current.style.transform = "rotateY(180deg)";
  };
  useEffect(() => {
    ref.current.style.transform = "rotateY(0deg)";
  }, [width]);
  return (
    <div className='feature-card'>
      <motion.div ref={ref} className='featured-card__inner'>
        <div className='featured-card__front'>
          <img className='featured-card__front-image' src={image} />

          <div className='featured-card__flipit' onClick={onClickHandler}>
            <span>Flip</span>
            <i className='fa fa-rotate-right'></i>
          </div>
          <span className='featured-card__title'>{title}</span>
        </div>
        <div className='featured-card__back'>{children}</div>
      </motion.div>
    </div>
  );
};

const Product = ({ product: { pics, title, description, to, videos } }) => {
  const [currentPic, setCurrentPic] = useState({ pic: pics[0], index: 0 });
  const { width } = useSelector((state) => state.dimensions);

  const changePic = (index) => {
    setCurrentPic({
      pic: pics[index],
      index: index,
    });
  };
  return (
    <div className='featured__product'>
      <Waves />
      <div className='featured__images'>
        <div className='featured__figure-container'>
          <Figure image={currentPic.pic} animate />
        </div>

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
          {videos && (
            <>
              <span>
                <i
                  style={{ opacity: 0.6, marginRight: "1rem" }}
                  className='fa fa-video-camera'
                  aria-hidden='true'></i>
              </span>

              {videos.map((item, index) => {
                return (
                  <MinVidBox
                    video={item.video}
                    title={item.title}
                    key={index}
                    index={index + 1}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Featured = () => {
  return (
    <>
      <div className='featured__spacer'></div>
      <div className='featured'>
        <span className='featured__title'>Featured products</span>
        <FeaturedCard
          image={featuredProducts.liveoceanlures.pics[0]}
          title={featuredProducts.liveoceanlures.title}>
          <Product product={featuredProducts["liveoceanlures"]} />
        </FeaturedCard>
        <FeaturedCard
          image={featuredProducts.dolphinsnaps.pics[0]}
          title={featuredProducts.dolphinsnaps.title}>
          <Product product={featuredProducts["dolphinsnaps"]} />
        </FeaturedCard>
      </div>
    </>
  );
};
export default Featured;

const variants = {
  open: { opacity: 1, scale: 1 },
  closed: { scale: 0.2, display: "none" },
};

export const MinVidBox = ({ index, title, video }) => {
  const ref = useRef();
  const [isOpen, setOpen] = useState(false);

  const callback = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.target.closest(".featured__video")) {
      return;
    }
    const tmp = ref.current.src;
    ref.current.src = "";
    ref.current.src = tmp;
    setOpen(!isOpen);
    document.body.removeEventListener("click", callback);
  };

  useEffect(() => {
    if (isOpen) document.body.addEventListener("click", callback);
    return () => document.body.removeEventListener("click", callback);
  }, [isOpen]);

  const onOpenClick = () => {
    setOpen(true);
  };

  return (
    <div className='video__index' onClick={onOpenClick}>
      {index}
      <motion.div
        variants={variants}
        animate={isOpen ? "open" : "closed"}
        className='featured__video'
        transition={{ duration: 0.3 }}>
        <div className='video'>
          <iframe
            ref={ref}
            className='
            video__iframe'
            allow='fullscreen'
            title={title}
            src={video}></iframe>
          <h5>{title}</h5>
        </div>
      </motion.div>
    </div>
  );
};
