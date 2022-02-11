import React, {useState, useEffect} from 'react'
import './fishfact.styles.scss';
import { getFishSpecies } from '../../../redux/actions/promoActions';
import { useDispatch, useSelector } from 'react-redux';

const FishFact = () => {
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getFishSpecies());
    }, [])

  return (
    <div>'fishfacts'</div>
  )
}

export default FishFact;
