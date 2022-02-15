import React from 'react';
import Banner from '../../svg/frontpagebanner/frontpagebanner.component';
import FishFact from '../fishfact/fishfact.component';
import Featured from '../featured/featured.component'

const HomeScreen = () => {

    return (
        <div>
            <Banner />
            <Featured />
            <FishFact />
            
        </div>
    ) 
};

export default HomeScreen;
