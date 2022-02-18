import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import "./dropdown.styles.scss";
import { categories, subcategories } from "./categories";

const navContainerVariants = {
  show: { opacity: 1, scaleY: 1, transition: { type: "tween", duration: .2} },
  hide: { opacity: 0, scaleY: 0 },
};

const dropdownVariants = {
  show: {
    opacity: 1,
    color: 'black',
    transition: { staggerChildren: .1, delayChildren: .05 },
  },
  hide: {
    opacity: .5,
    color: 'red',
    transition: { staggerChildren: .1, staggerDirection: 1 },
  },
};
const navItemVariants = {
  show: {
    opacity: 1,
 
  },
  hide: {
    opacity: 0,
  },
};

const NavItem = ({ i, category, toggleMobileNav, showMobileNav }) => {
  const [hidden, setHidden] = useState(true);

  const onNavItemClick = (e) => {
    e.preventDefault();
    setHidden(!hidden);
  };

  return (
    <motion.li variants={navItemVariants} className='nav-item'>
      <div
        className={`nav-item__link ${!hidden && "nav-item__link--expanded"}`}>
        <Link to={`products/${category.category}/`} onClick={toggleMobileNav}>
          {category.title}
        </Link>
        {/* <span className='nav-item__link--icon'>{category.icon}</span> */}

        <div
          className={`nav-item__expand-button ${
            !hidden && "nav-item__expand-button--expanded"
          } fas fa-caret-down`}
          onClick={onNavItemClick}></div>
      </div>
      <ul className={`nav-submenu ${hidden && "nav-submenu--hidden"}`}>
        {subcategories[category.category].map((subcategory) => (
          <li className='nav-submenu-item' key={subcategory.subcategory}>
            <Link
              className='nav-submenu-item__link'
              to={`products/${category.category}/${subcategory.subcategory}/`}
              onClick={toggleMobileNav}>
              {subcategory.title}
            </Link>
          </li>
        ))}
      </ul>
    </motion.li>
  );
};

const Dropdown = ({ showMobileNav, toggleMobileNav, menuButtonRef }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const onLogoutClick = () => {
    dispatch(logout());
    navigate("/");
  };

  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (e) => {
      if (ref.current.contains(e.target)) return;
      if (menuButtonRef.current.contains(e.target)) return;
      toggleMobileNav();
    };

    document.body.addEventListener("click", onBodyClick, { capture: true });
    return () =>
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
  }, []);

  return (
    <motion.nav
      initial={showMobileNav ? "hide" : "show"}
      animate={!showMobileNav ? "hide" : "show"}
      variants={navContainerVariants}
      ref={ref}
      className='nav'>
        <AnimatePresence>
      <motion.ul variants={dropdownVariants} className='nav-list'>
        {categories.map((category, i) => (
          <NavItem
            i={i}
            category={category}
            showMobileNav
            toggleMobileNav={toggleMobileNav}
            key={category.category}
          />
        ))}

        {userInfo ? (
          <>
            <Link className='nav-item__link' to='/profile'>
              Profile
            </Link>

            <div className='nav-item__link' to='/' onClick={onLogoutClick}>
              <span>Logout</span>
              <i class='fas fa-sign-out-alt'></i>
            </div>
          </>
        ) : (
          <Link className='nav-item__link' to='/login/'>
            Login
          </Link>
        )}
      </motion.ul>
      </AnimatePresence>
    </motion.nav>
  );
};

export default Dropdown;
