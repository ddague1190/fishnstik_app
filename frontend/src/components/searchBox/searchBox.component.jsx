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
            navigate(`/products/?keyword=${keyword}`)
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
                className='input'
            >
            </input>

            <button
                type='submit'
                className='btn--navbar'
            >
                Go!
            </button>
        </form>
        
    )
}

export default SearchBox
