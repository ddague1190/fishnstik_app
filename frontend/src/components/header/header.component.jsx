import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import { logout } from '../../actions/userActions';
import SearchBox from '../searchBox/searchBox.component';
import { useNavigate } from 'react-router-dom';
import './header.styles.scss';
import { NavBarElement, LinkElement } from '../navBarElement/navBarElement.component';
import OtherPage from '../otherpage/otherpage.component';


const Header = () => {

    const categories = [
        {
            'keyword': 'snap',
            'title': 'Snaps'
        },
        {
            'keyword': 'Swivel',
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
    const [showOtherProductsNav, setShowOtherProductsNav] = useState(false)
    const [hideSearchBox, setHideSearchBox] = useState(true);
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    
    useEffect(()=> {
        if(showOtherProductsNav) {
            setTimeout(()=>setShowOtherProductsNav(false), 8000);
        }
    }, [showOtherProductsNav])


    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/')
    };

    return (
        <header className='header'>
                <div className='header__promo'>
                        Experts available by phone | Enjoy Free Expedited Shipping On All Orders Over $100
                </div>


                <div className='header__userpanel'>
                            <NavBarElement to='/'>
                                Home
                            </NavBarElement>
                    {userInfo ? (
                        <div className='header__userpanel--1'>
                            <NavBarElement to='/profile'>
                                Profile
                            </NavBarElement>
                            <LinkElement  to='/' onClick={logoutHandler}>
                                Logout
                            </LinkElement>
                        </div>) : (
                            <NavBarElement className='header__userpane--2' to='/login'>
                                <i className="fas fa-user"></i>Login
                            </NavBarElement>)
                    }
            </div>
            <nav className='header__nav'>
                <LinkElement to='products/' >All</LinkElement>

                {categories.map(({keyword, title}, index) => (
                    <LinkElement
                        to={`products/?keyword=${keyword}`} 
                        key={keyword}
                    >
                        {title}
                    </LinkElement>
                ))}
                <button onClick={()=>setShowOtherProductsNav(!showOtherProductsNav)} className={`header__nav--otherproducts ${showOtherProductsNav ? 'active' : ''}`}>Other Products</button>

                <div className='header__nav--search'>
                    <i onClick={() => setHideSearchBox(!hideSearchBox)} className="fas fa-search"></i> 
                    {!hideSearchBox && <SearchBox/>}
                </div>

                {showOtherProductsNav && <OtherPage />}
            </nav>


            

        </header>
    )
};

export default Header;
