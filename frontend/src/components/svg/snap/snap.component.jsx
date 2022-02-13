import React, {useRef, useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import './snap.styles.scss';

const Snap = ({className}) => {
    const {loading, product} = useSelector(state => state.productDetails);
    const [angle, setAngle] = useState(-8)
    const ref = useRef();
    const finalAngle = -20;

    const transformValue = `translate(820px, 350px) rotate(${angle}deg) translate(-820px, -350px)`

    const animation = () => {
        let opened=false;
        let closing = false;
        let currentAngle = -8;
        const breakpoint = -20;
        const intervalId = setInterval(()=> {

            setAngle(currentAngle);

            if(currentAngle < 0 && !opened) {
                currentAngle += .5;
            } 
            else if (!closing) {
                currentAngle -= .5;
                opened=true;
                if(currentAngle < -19) closing = true;
            }
            else if (closing) {
                currentAngle += .5;
                if(currentAngle > -9) clearInterval(intervalId);
            }
        }, 13)
    }


useEffect(()=> {
    if(!loading) animation();
}, [product])

useEffect(()=>{
    ref.current.style.transform = transformValue
}, [angle])
    


    return <svg className='snap1' xmlns="http://www.w3.org/2000/svg" viewBox="250 230 300 300">
                    <path d="M894.84,432.54a1.48,1.48,0,0,0,.1-.36l1-6.21a1.49,1.49,0,0,0,0-.21v-6.18a1.41,1.41,0,0,0-.07-.41L894,413.05a1.33,1.33,0,0,0-.16-.34l-3.28-5.17a2,2,0,0,0-.27-.31l-6.84-5.86L878.08,397a1.31,1.31,0,0,0-.36-.21L863,390.89l-.11,0L845,385.38l-.09,0-24.87-6a.51.51,0,0,0-.17,0L788,375.87h-.09l-58-2.5H670.38l-45.46,2.5-83.5,7-156,21.22L315.5,414.14a1.38,1.38,0,0,1-1.58-1.37h0a1.39,1.39,0,0,0-1.61-1.38l-7.89,1.23-43.26,6.71a1.48,1.48,0,0,0-.46.16l-9.63,5.29a1.46,1.46,0,0,0-.28.21l-9.33,8.84-.08.08-3.9,4.39a1,1,0,0,0-.12.15l-3.92,5.89-.05.06-9,12-23.94,32.41a1.07,1.07,0,0,1-.14.16L193,496.3l-.14.13L185,502.28l-.24.15-8.37,3.94-9.8,4.4a1.06,1.06,0,0,1-.43.12l-10.21,1h-9.92a1.43,1.43,0,0,1-.29,0l-9.24-1.95a1.41,1.41,0,0,1-.22-.06l-8.8-3.42-.18-.09-6.91-3.95-6.37-3.43a1.38,1.38,0,0,1-.25-.17l-6.88-5.9L100.51,487a1.63,1.63,0,0,1-.17-.2l-5.42-7.39-5.37-7.8a1.35,1.35,0,0,1-.2-.44l-2.92-11.19,0-.15-1.47-10.32a1.41,1.41,0,0,1,0-.2V439a1.27,1.27,0,0,1,0-.2L86.4,429a1.16,1.16,0,0,1,0-.18l2.94-10.3a1,1,0,0,1,.09-.22l5.41-11.32a.64.64,0,0,1,.08-.14L101.82,396a1.49,1.49,0,0,1,.23-.28L113.8,385a1.1,1.1,0,0,1,.25-.19l11.28-6.37.18-.09,12.66-4.87a1.43,1.43,0,0,1,.5-.09h16.12l.25,0,13.82,2.47.11,0,9.33,2.46a.83.83,0,0,1,.22.08l9.79,4.4.2.11,8.85,5.9.1.08,14.92,11.93.06.05,14.44,12.94.07.08,34,35.46" transform="translate(-74.92 -73.37)"/>
                    <path d="M344.42,381.87" transform="translate(-74.92 -73.37)"/>
                    <path d="M249.92,393.87l9,64" transform="translate(-74.92 -73.37)"/>
                    <path d="M270.92,389.87l9,64" transform="translate(-74.92 -73.37)"/>
                    <path d="M291.92,385.87l9,64" transform="translate(-74.92 -73.37)"/>
                    <path d="M312.92,382.87l9,64" transform="translate(-74.92 -73.37)"/>
                    <path d="M341.92,384.87" transform="translate(-74.92 -73.37)"/>
                    <g ref={ref} className='snap1__arm'>
                        <path d="M356.72,297.78l9.91,64.7,10.69,34.38,16,27.2,9.61,8.8,10.46,6.92,17.26,8.63,17.79,5.68,25.17,7,25.11,4.43,58.6,10.33L609,482.39,681.11,488l46.61.6,46-1.54,24.54-3.8,21.66-4.81L855.74,468,874,459.56l8.29-6.66,4.4-4.81,3.41-5,2.12-6.23,1.13-6.4" transform="translate(-74.92 -73.37)"/>
                        <path d="M323.27,357.88" transform="translate(-74.92 -73.37)"/>
                        <path d="M353.73,300.3l-5.49,60" transform="translate(-74.92 -73.37)"/>
                    </g>

        </svg>  ;
};


export default Snap;