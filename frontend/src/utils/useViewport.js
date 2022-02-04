import {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { updateViewportDimensions } from '../actions/responsiveActions';



const useViewport = () => {

  const dispatch = useDispatch();
  
    useEffect(() => {
      const handleWindowResize = () => {
        dispatch(updateViewportDimensions(window.innerWidth, window.innerHeight))
      }
  
      window.addEventListener("resize", handleWindowResize, {capture: true});
    
      dispatch(updateViewportDimensions(window.innerWidth, window.innerHeight))

      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
  
    return;
  }

  export default useViewport;


