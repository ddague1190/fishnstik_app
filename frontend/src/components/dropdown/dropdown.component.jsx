
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
import { Link, useNavigate } from 'react-router-dom';
import './dropdown.styles.scss';
import { categories, subcategories } from './categories';

const NavItem = ({category, setShowMobileNav}) => {
    const [hidden, setHidden] = useState(true);

    const onNavItemClick = (e) => {
        e.preventDefault();
        setHidden(!hidden);
    }



    return (
        <li className='nav-item'> 

            <Link className={`nav-item__link ${!hidden && 'nav-item__link--expanded'}`} to={`products/${category.category}/`} onClick={()=>setShowMobileNav(false)}>
                {category.title}
                <div className={`nav-item__expand-button ${!hidden && 'nav-item__expand-button--expanded'} fas fa-caret-down`} onClick={onNavItemClick}></div>
            </Link>
            <ul className={`nav-submenu ${hidden && 'nav-submenu--hidden'}`}>
                {/* <ul className='nav-submenu-list'> */}

                    {subcategories[category.category].map((subcategory) => 
                    <li className='nav-submenu-item' key={subcategory.subcategory}>
                        <Link className='nav-submenu-item__link' to={`products/${category.category}/${subcategory.subcategory}/`} onClick={()=>setShowMobileNav(false)}>
                          {subcategory.title}
                        </Link>
                    </li>
                    )}
                {/* </ul> */}
            </ul>
        </li>
    )
}



const Dropdown = ({setShowMobileNav}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onLogoutClick = () => {
        dispatch(logout());
        navigate('/');
    };
    return (
        <nav className='nav'>
            <ul className='nav-list'>
            {categories.map((category) => 

                <NavItem category={category} setShowMobileNav={setShowMobileNav} key={category.category} /> 
            )}
            </ul>
            <Link className='btn--navbar2 nav-item__link nav-item__link--notaproduct' to='/profile'>
                    Profile
            </Link>
            <div  className=' nav-item__link nav-item__link--notaproduct' to='/' onClick={onLogoutClick}>
                <span>Logout</span>
                <i class="fas fa-sign-out-alt"></i>
            </div>
        </nav>

    )
}

export default Dropdown;