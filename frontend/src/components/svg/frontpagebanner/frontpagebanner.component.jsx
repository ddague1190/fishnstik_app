import './frontpagebanner.styles.scss';
import FrontPageSVG from './FrontPageSVG';
import HandleSVG from './HandleSVG';
import RodSVG from './RodSVG';
import React, {useRef, useEffect} from 'react';

const Banner = () => {
    const setRef = useRef();

    return (
    <div className='banner'>
        <FrontPageSVG />
        <RodSVG />

    </div>
    )
}

export default Banner;