import React from 'react';
import Banner from '../banner/banner.component';
import FishFact from '../fishfact/fishfact.component';
import Featured from '../featured/featured.component'

const HomeScreen = () => {

    return (
        <div>
            <Banner />
            <FishFact />
            <Featured />
            
        </div>
    ) 
};

export default HomeScreen;
