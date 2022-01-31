
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.styles.scss';
import { categories, subcategories } from '../dropdown/categories';

const NavItem = ({category, setShowMobileNav}) => {
    const [hidden, setHidden] = useState(true);

    const onNavItemClick = (e) => {
        e.preventDefault();
        setHidden(!hidden);
    }



    return (
        <li className='desktop-nav-item'>

            <Link className='desktop-nav-item__link btn--navbar' to={`products/${category.category}/`} onClick={()=>setShowMobileNav(false)}>
                {category.title}
            </Link>
            <ul className='desktop-nav-submenu u-box-shadow'>
                        <svg className='desktop-nav-submenu__triangle' height='10' width='200'>
                            <path fill='white' d='M150 0 L75 200 L225 200 Z' />
                        </svg>

                    {subcategories[category.category].map((subcategory) => 
                    <li className='desktop-nav-submenu-item' key={subcategory.subcategory}>
                        <Link className='desktop-nav-submenu-item__link' to={`products/${category.category}/${subcategory.subcategory}/`} onClick={()=>setShowMobileNav(false)}>
                          {subcategory.title}
                        </Link>
                    </li>
                    )}
            </ul>
        </li>
    )
}



const NavBar = ({setShowMobileNav}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onLogoutClick = () => {
        dispatch(logout());
        navigate('/');
    };
    return (
        <nav className='desktop-nav'>
            <ul className='desktop-nav-list'>
            {categories.map((category) => 

                <NavItem category={category} setShowMobileNav={setShowMobileNav} key={category.category} /> 
            )}
            </ul>
        </nav>

    )
}

export default NavBar;