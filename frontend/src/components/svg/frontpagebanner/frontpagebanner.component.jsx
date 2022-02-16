import './frontpagebanner.styles.scss';
import FrontPageSVG from './FrontPageSVG';
import React, {useRef, useEffect} from 'react';

const Banner = () => {
    const setRef = useRef();

    useEffect(()=>{
        setRef.current.style.transform = 'rotate(-30deg)';
    })
    return (
    <div className='banner'>
        <FrontPageSVG setRef={setRef}  />
    </div>
    )
}

export default Banner;