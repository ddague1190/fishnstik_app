import React from "react";
import Banner from "../../svg/frontpagebanner/frontpagebanner.component";
import FishFact from "../fishfact/fishfact.component";
import Featured from "../featured/featured.component";
import Emotive from "../../svg/emotive/emotive.component";
const HomeScreen = () => {
  return (
    <div>

      <Banner />
      <Emotive />

      <Featured />
      <FishFact />
    </div>
  );
};

export default HomeScreen;
