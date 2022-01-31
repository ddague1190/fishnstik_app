import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './searchBox.styles.scss';

const SearchBox = () => {

    const [keyword, setKeyword] = useState('')

    let navigate = useNavigate();
    let location = useLocation();

    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword) {
            const timeoutId = setTimeout(()=>{
                navigate(`/products/?keyword=${keyword}`)
            }, 500)
        } else {
            navigate(location.pathname)
        }
        return (timeoutId)=> clearTimeout(timeoutId)
    }

    useEffect(()=> {
        const timeoutId = setTimeout(()=>{
              console.log('timeouttest')
          if(keyword) navigate(`/products/?keyword=${keyword}`)
        }, 500)

        return (timeoutId)=> clearTimeout(timeoutId)
    }, [keyword])


    return (

        <form className='searchbox' >
            <input
                size="sm"
                type='text'
                name='q'
                placeholder='search for products...'
                onChange={(e) => setKeyword(e.target.value)}
                className='searchbox__input'
            >
            </input>
        </form>
        
    )
}

export default SearchBox
