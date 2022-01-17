import React, {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './searchBox.styles.scss';

const SearchBox = () => {

    const [keyword, setKeyword] = useState('')

    let navigate = useNavigate();
    let location = useLocation();

    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword) {
            navigate(`/products/?keyword=${keyword}&page=1`)
        } else {
            navigate(location.pathname)
        }
    }
    return (

        <form onSubmit={submitHandler} className='searchbox' >
            <input
                size="sm"
                type='text'
                name='q'
                placeholder='search for products...'
                onChange={(e) => setKeyword(e.target.value)}
                className='searchbox__input'
            >
            </input>

            <button
                type='submit'
                variant='outline-success'
                className='searchbox__button'
            >
                Go!
            </button>
        </form>
    )
}

export default SearchBox
