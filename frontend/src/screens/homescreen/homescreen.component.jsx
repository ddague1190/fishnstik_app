import React, { useEffect } from 'react';
import ProductList from '../../components/productlist/productlist.component';
import Logo from '../../components/logo/logo.component';
import Banner from '../../components/banner/banner.component';
import Featured from '../../components/featured/featured.component';


const HomeScreen = () => {

    return (
        <div>
            <Logo />
            <Featured />
            <Banner />
        </div>
    )
};

export default HomeScreen;
