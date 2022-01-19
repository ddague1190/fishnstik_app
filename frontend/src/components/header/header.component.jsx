import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import { logout } from '../../actions/userActions';
import SearchBox from '../searchBox/searchBox.component';
import { useNavigate, useParams } from 'react-router-dom';
import './header.styles.scss';
import { NavBarElement, LinkElement, NavBarElement2 } from '../navBarElement/navBarElement.component';
import SubcategoriesList from '../otherpage/otherpage.component';
import OtherProducts from '../otherproducts/otherproducts.component';


const Header = () => {

    const categories = [
        {
            'category': 'snaps',
            'title': 'Snaps'
        },
        {
            'category': 'swivels',
            'title': 'Swivels'
        },
        {
            'category': 'fishingline',
            'title': 'Fishing line'
        },
        {
            'category': 'hooks',
            'title': 'Hooks'
        },
        {
            'category': 'lures',
            'title': 'Lures'
        },
    ];

    let navigate = useNavigate();
    let {search} = useLocation();
    const [hideSearchBox, setHideSearchBox] = useState(true);
    const [currentCategory, setCurrentCategory] = useState('');
    const [seeingAll, setSeeingAll] = useState(false);
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();


    const onNavClick = (category) => {
        setCurrentCategory(category);
        setSeeingAll(false);
        setHideSearchBox(true);
        navigate(`products/${category}`)
    }

    const onSearchBoxClick = () => {
        setHideSearchBox(!hideSearchBox);
        setCurrentCategory('');
        setSeeingAll(false);
    }

    const onLogoClick = () => {
        setCurrentCategory('');
        setSeeingAll(false);
        setHideSearchBox(true);
        navigate('/');
    };
    
    const onLogoutClick = () => {
        dispatch(logout());
        navigate('/');
    };

    const onSeeAllProductsClick = () => {
        setSeeingAll(!seeingAll);
        setHideSearchBox(true);
        setCurrentCategory(false);
        navigate('products/all');

    };

    return (
        <header className='header'>


                <div className='header__userpanel'>
                    <img onClick={onLogoClick} className='header__userpanel--logo' src={'https://fishnstik-pictures.s3.amazonaws.com/FishNStik.png'} alt='company_logo' />

                    {userInfo ? (
                        <div className='header__userpanel--1'>
                            <NavBarElement2 to='/profile'>
                                Profile
                            </NavBarElement2>
                            <div  className='navBarElement2' to='/' onClick={onLogoutClick}>
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
                    <div
                        className={`navBarElement ${seeingAll ? 'active' : ''}`}
                        onClick={onSeeAllProductsClick}
                    >
                        All
                    </div>

                {categories.map(({category, title}, index) => (
                    <div
                        className={`navBarElement ${currentCategory===category ? 'active' : ''}`}
                        onClick={()=>onNavClick(category)}
                    >
                        {title}
                    </div>
                ))}
                
                    <OtherProducts setSeeingAll={setSeeingAll} setCurrentCategory={setCurrentCategory} />

                    <div className='header__nav--search'>
                        <i onClick={onSearchBoxClick} className="fas fa-search"></i> 
                    </div>

                {currentCategory && <SubcategoriesList category={currentCategory} /> }
            </nav>

            {!hideSearchBox && <SearchBox/>}

            

        </header>
    )
};

export default Header;
