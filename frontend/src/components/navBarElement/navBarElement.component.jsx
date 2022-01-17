import { NavLink, Link, useLocation } from 'react-router-dom';
import './navBarElement.styles.scss';


export const NavBarElement = ({to, ...props}) => {

    return (
    <NavLink key={to} to={to} className='navBarElement'>{props.children}</NavLink>
    )
};

export const LinkElement = ({to, ...props}) => {

    const {search} = useLocation();
    const isMatch = search.includes('?') && to.includes(search);
    return (
    <Link key={to} to={to} className={`navBarElement ${isMatch ? 'active' : ''} `}>{props.children}</Link>
    )
};
