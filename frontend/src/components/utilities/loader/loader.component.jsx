import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './loader.styles.scss';
import {ReactComponent as Marlin} from './marlin.svg'
import {ReactComponent as Dolphin} from './dolphin.svg'
import {ReactComponent as Tuna} from './tuna.svg'
import { useSelector, useDispatch } from 'react-redux';



const Loader = () => {
    const dispatch = useDispatch();
    
    const loaders = [
        <Tuna />,
        <Dolphin />,
        <Marlin />
    ]
    
    return ReactDOM.createPortal(
        <div className='loader'>
                <span className='loader__text'>Loading ... </span>
            {loaders[(Math.floor(Math.random() * 3))]}
        </div>,
        document.body
    )
}


export default Loader;
