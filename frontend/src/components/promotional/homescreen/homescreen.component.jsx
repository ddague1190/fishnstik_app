import React from "react";
import Banner from "../../svg/frontpagebanner/frontpagebanner.component";
import FishFact from "../fishfact/fishfact.component";
import Featured from "../featured/featured.component";
import { pageVariants } from "../../../utils/variants";
import { motion } from "framer-motion";
import Emotive from "../../svg/emotive/emotive.component";
const HomeScreen = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial='initial'
      animate='in'
      exit='out'>
      <Banner />
      <Emotive />
      <Featured />
      <FishFact />
    </motion.div>
  );
};

export default HomeScreen;
