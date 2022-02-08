import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './searchBox.styles.scss';
import { useDispatch } from 'react-redux';
import { updateKeyword } from '../../../redux/actions/routeActions';

const SearchBox = () => {

    const [keyword, setKeyword] = useState('')

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateKeyword(keyword));
        navigate(`/products/?keyword=${keyword}`);
    }
    return (
        <form className='searchbox' onSubmit={submitHandler} >
            <input
                size="sm"
                type='text'
                name='q'
                placeholder='search for products...'
                onChange={(e) => setKeyword(e.target.value)}
                className='searchbox__input'
            >
            </input>
            <button className='searchbox__button button' type='submit'>go</button>
        </form>
    )
}

export default SearchBox
