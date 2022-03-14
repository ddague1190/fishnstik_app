import React from "react";
import Banner from "../../svg/frontpagebanner/frontpagebanner.component";
import { motion } from "framer-motion";
import FishFact from "../fishfact/fishfact.component";
import Featured from "../featured/featured.component";
import Emotive from "../../svg/emotive/emotive.component";
import Deepsea from "../../svg/deepsea/deepsea.component";
import { ReactComponent as Plane } from "./planebanner.svg";
import { Video } from "../featured/featured.component";
import "./homescreen.styles.scss";
const images = [
  "https://www.fishwatch.gov/sites/default/files/atlantic_mahimahi_dolphinfish.png",
  "https://fishnwirepictures.s3.amazonaws.com/striped-marlin-illustration.png",
  "https://fishnwirepictures.s3.amazonaws.com/atlantic_yellowfin_tuna_0.png",
];

const Fish = ({ image, style }) => {
  return <motion.img style={style} className='homescreen__fish' src={image} />;
};

const HomeScreen = () => {
  return (
    <div>
      <div className='homescreen__box'>
        <Featured />
      </div>

      <Deepsea />

      <section className='homescreen__intro'>
        <h1>About us</h1>
        <h2>
          Established in 1999, we manufacture and distribute terminal tackle. We
          aim to provide world-class service and the absolute best products at
          an exceptional value.
        </h2>
      </section>

      <FishFact />
    </div>
  );
};

export default HomeScreen;
