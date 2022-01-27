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
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();


    const onNavClick = (category) => {
        setCurrentCategory(category);
        setHideSearchBox(true);
        navigate(`products/${category}`)
    }

    const onSearchBoxClick = () => {
        setHideSearchBox(!hideSearchBox);
        setCurrentCategory('');
    }

    const onLogoClick = () => {
        setCurrentCategory('');
        setHideSearchBox(true);
        navigate('/');
    };
    
    const onLogoutClick = () => {
        dispatch(logout());
        navigate('/');
    };

    const onSeeAllProductsClick = () => {
        setHideSearchBox(true);
        setCurrentCategory(false);
        navigate('products/all');

    };

    return (
        <>

        <header className='header'>
            
                <div className='headertop'>

                    <nav className='nav'>

{categories.map(({category, title}, index) => (
    <div
        className={`btn--navbar ${currentCategory===category ? 'btn--navbar--active' : ''}`}
        onClick={()=>onNavClick(category)}
    >
        {title}
    </div>
))}

    <OtherProducts setCurrentCategory={setCurrentCategory} />

    <div className='nav__search'>
        <i onClick={onSearchBoxClick} className="fas fa-search"></i> 
    </div>

{currentCategory && <SubcategoriesList category={currentCategory} /> }
</nav>


                    {userInfo ? (
                        <div className='headertop__withuser'>
                            <NavBarElement2 to='/profile'>
                                Profile
                            </NavBarElement2>
                            <NavBarElement2 to='/cart'>
                                <i class="fas fa-shopping-cart"></i>
                            </NavBarElement2>
                            <div  className='btn--navbar2' to='/' onClick={onLogoutClick}>
                                <i class="fas fa-sign-out-alt"></i>
                            </div>
                        </div>) : (
                        <div className='headertop__withoutuser' >
                            <NavBarElement2 to='/cart'>
                                <i class="fas fa-shopping-cart"></i>
                            </NavBarElement2>
                            <NavBarElement2 to='/login'>
                                <i className="fas fa-user"></i>
                            </NavBarElement2>
                        </div>)
                    }
                </div>


            {!hideSearchBox && <SearchBox/>}

            

        </header>
        </>
    )
};

export default Header;
