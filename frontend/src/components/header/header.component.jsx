import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import SearchBox from '../searchBox/searchBox.component';
import { useNavigate, useParams } from 'react-router-dom';
import './header.styles.scss';
import Dropdown from '../dropdown/dropdown.component';
import UserPanel from '../userpanel/userpanel.component';
import { NavBarElement2 } from '../navBarElement/navBarElement.component';
import Logo from '../logo/logo.component';
import NavBar from '../navbar/navbar.component';


const Header = () => {

    let navigate = useNavigate();
    let {search} = useLocation();
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [hideSearchBox, setHideSearchBox] = useState(true);
    const [currentCategory, setCurrentCategory] = useState('');
    const userLogin = useSelector(state => state.userLogin);
    const {width, height} = useSelector(state => state.dimensions)
    const { userInfo } = userLogin;
    const dispatch = useDispatch();
    const onNavClick = (category) => {
        setCurrentCategory(category);
        setHideSearchBox(true);
        navigate(`products/${category}`)
    }

    const breakpoint = 820;

    return (

        <>

        {width < breakpoint ? (

            <header className='header'>    
                <div className='userpanel userpanel--mobile'>
                    <SearchBox />     
                    <NavBarElement2 to='/cart'>
                        <i class="fas fa-shopping-cart"></i>
                    </NavBarElement2>  
                </div>
                <div className='mobile-navbar'>
                    <Logo />
                    <div className='mobile-navbar__button btn--navbar2' onClick={()=>setShowMobileNav(!showMobileNav)}>
                        <span>MENU</span>
                        <svg className='svg' viewBox="0 0 20 20" width="20" height="20">
                            <rect width="20" height="4" rx="5"></rect>
                            <rect y="6.3" width="20" height="4" rx="5"></rect>
                            <rect y="12.6" width="20" height="4" rx="5"></rect>
                        </svg>
                    </div>
                </div>

            {showMobileNav && <Dropdown showMobileNav={setShowMobileNav} />}
            </header>

        ) : (
            <header className='header'>  
            
                <div className='userpanel'>
                    <SearchBox />
                    <div className='desktop-navbar__sociallinks'>
                        <a href='https://www.facebook.com/fish.n.stik'><i className="fab fa-facebook"></i></a>
                    </div>
                    <UserPanel />
                </div>

                <div className='desktop-navbar'>
                    <Logo />
 
                    <NavBar />
                </div>

            </header>

        )}
    </>
    )
};

export default Header;
