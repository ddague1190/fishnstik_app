import React from "react";
import Banner from "../../svg/frontpagebanner/frontpagebanner.component";
import FishFact from "../fishfact/fishfact.component";
import Featured from "../featured/featured.component";
import Emotive from "../../svg/emotive/emotive.component";
import Deepsea from "../../svg/deepsea/deepsea.component";
import { Video } from "../featured/featured.component";
import './homescreen.styles.scss';
const HomeScreen = () => {
  return (
    <div>
      <Featured />
      {/* <Video/> */}
      <Deepsea/>
      {/* <Banner /> */}
      {/* <Emotive /> */}
      {/* <section className="homescreen__intro">
        <h1>About us</h1>
        <h2>Established in 1999, we manufacture and distribute terminal tackle. We aim to provide world-class service and the absolute best products at an exceptional value.</h2>
      </section> */}
    
      <FishFact />
    </div>
  );
};

export default HomeScreen;
