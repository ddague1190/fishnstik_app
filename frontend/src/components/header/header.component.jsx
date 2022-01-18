import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import { logout } from '../../actions/userActions';
import SearchBox from '../searchBox/searchBox.component';
import { useNavigate } from 'react-router-dom';
import './header.styles.scss';
import { NavBarElement, LinkElement, NavBarElement2 } from '../navBarElement/navBarElement.component';
import CategoriesList from '../otherpage/otherpage.component';
import OtherProducts from '../otherproducts/otherproducts.component';


const Header = () => {

    const categories = [
        {
            'keyword': 'snap',
            'title': 'Snaps'
        },
        {
            'keyword': 'swivel',
            'title': 'Swivels'
        },
        {
            'keyword': 'line',
            'title': 'Fishing line'
        },
        {
            'keyword': 'hook',
            'title': 'Hooks'
        },
        {
            'keyword': 'lure',
            'title': 'Lures'
        },
    ];

    let navigate = useNavigate();
    let {search} = useLocation();

    const [hideSearchBox, setHideSearchBox] = useState(true);
    const [keyword, setKeyword] = useState('');
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const onNavClick = (keyword) => {
        setKeyword(keyword);
        navigate(`products/?keyword=${keyword}`)
    }
    
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/')
    };

    return (
        <header className='header'>


                <div className='header__userpanel'>
                    <img onClick={()=>navigate('/')} className='header__userpanel--logo' src={'https://fishnstik-pictures.s3.amazonaws.com/FishNStik.png'} alt='company_logo' />

                    {userInfo ? (
                        <div className='header__userpanel--1'>
                            <NavBarElement2 to='/profile'>
                                Profile
                            </NavBarElement2>
                            <div  className='navBarElement2' to='/' onClick={logoutHandler}>
                            <i class="fas fa-sign-out-alt"></i>
                            </div>
                        </div>) : (
                        <div className='header__userpanel--2' >
                            <NavBarElement2 to='/login'>
                                <i className="fas fa-user"></i>
                            </NavBarElement2>
                        </div>)
                    }
            </div>
            <nav className='header__nav'>
                <LinkElement to='products/'>All</LinkElement>

                {categories.map(({keyword, title}, index) => (
                    <div
                        className={`navBarElement ${search.includes(keyword) ? 'active' : ''}`}
                        onClick={()=>onNavClick(keyword)}
                    >
                        {title}
                    </div>
                ))}
                    <OtherProducts />

                    <div className='header__nav--search'>
                        <i onClick={() => setHideSearchBox(!hideSearchBox)} className="fas fa-search"></i> 
                        {!hideSearchBox && <SearchBox/>}
                    </div>

                {keyword && <CategoriesList category={keyword} /> }
            </nav>


            

        </header>
    )
};

export default Header;
