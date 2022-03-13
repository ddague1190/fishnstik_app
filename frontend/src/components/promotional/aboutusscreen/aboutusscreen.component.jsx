import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./aboutusscreen.styles.scss";
import RodSVG from "../../svg/frontpagebanner/RodSVG";
import Emotive from "../../svg/emotive/emotive.component";

function AboutUsScreen() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='aboutus'>
      <RodSVG castRod />
      <Emotive />

      <div className='aboutus__box'>
          <span className='aboutus__header featured__title'>About us</span>
        <h1 className='aboutus__title'>
          <u>Who we are:</u> a family-owned terminal tackle manufacturer and
          wholesaler located in West Palm Beach, FL
        </h1>
        <h1 className='aboutus__title'>
          <u>Our mission:</u> to help you get the most out of your fishing
          journey...
        </h1>
        <motion.ul
          className='aboutus__perks'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}>
          <li>The best products</li>
          <li>Wholesale pricing</li>
          <li>Made in USA</li>
          <li>Custom tackle services</li>
          <li>Fishing gurus on-site</li>
        </motion.ul>
      </div>
    </div>
  );
}

export default AboutUsScreen;
