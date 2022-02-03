
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
import { Link, useNavigate } from 'react-router-dom';
import './dropdown.styles.scss';
import { categories, subcategories } from './categories';

const NavItem = ({category, setShowMobileNav}) => {
    const [hidden, setHidden] = useState(true);

    const onNavItemClick = (e) => {
        // console.log(ref.current.contains(e.target))
        e.preventDefault();
        setHidden(!hidden);
    }



    return (
        <li  className='nav-item'> 

            <div className={`nav-item__link ${!hidden && 'nav-item__link--expanded'}`}  >
                <Link to={`products/${category.category}/`} onClick={()=>setShowMobileNav(false)}>{category.title}</Link> 
                <span className='nav-item__link--icon'>{category.icon}</span>

                <div className={`nav-item__expand-button ${!hidden && 'nav-item__expand-button--expanded'} fas fa-caret-down`} onClick={onNavItemClick}></div>
            </div>
            <ul className={`nav-submenu ${hidden && 'nav-submenu--hidden'}`}>

                    {subcategories[category.category].map((subcategory) => 
                    <li className='nav-submenu-item' key={subcategory.subcategory}>
                        <Link className='nav-submenu-item__link' to={`products/${category.category}/${subcategory.subcategory}/`} onClick={()=>setShowMobileNav(false)}>
                          {subcategory.title}
                        </Link>
                    </li>
                    )}
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
    
    const ref = useRef()

    useEffect(()=>{
        const onBodyClick = (e)=>{
            if(ref.current.contains(e.target)) return;  
            setShowMobileNav(false);
        };
 
        document.body.addEventListener('click', onBodyClick, { capture: true })
        return ()=>document.body.removeEventListener('click', onBodyClick, { capture: true });
    }, []);

    return (
        <nav ref={ref} className='nav'>

            <ul className='nav-list'>
            {categories.map((category) => 

                <NavItem category={category} setShowMobileNav={setShowMobileNav} key={category.category} /> 
            )}
            
            <Link className='nav-item__link' to='/profile'>
                    Profile
            </Link>

            <div  className='nav-item__link' to='/' onClick={onLogoutClick}>
                <span>Logout</span>
                <i class="fas fa-sign-out-alt"></i>
            </div>
            </ul>

        </nav>
    )
}

export default Dropdown;