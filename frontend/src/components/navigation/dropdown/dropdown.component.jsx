import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { motion, useCycle } from "framer-motion";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import "./dropdown.styles.scss";
import { categories, subcategories } from "./categories";

const NavItem = ({ i, category, toggleMobileNav }) => {
  const variants = {
    true: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    false: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  const [hidden, setHidden] = useState(true);

  const onNavItemClick = (e) => {
    e.preventDefault();
    setHidden(!hidden);
  };

  return (
    <motion.li variants={variants} className='nav-item'>
      <div
        className={`nav-item__link ${!hidden && "nav-item__link--expanded"}`}>
        <Link to={`products/${category.category}/`} onClick={toggleMobileNav}>
          {category.title}
        </Link>
        <span className='nav-item__link--icon'>{category.icon}</span>

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
  const variants = {
    true: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    false: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

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
      animate={showMobileNav ? "true" : "false"}
      ref={ref}
      className='nav'>
      <motion.ul variants={variants} className='nav-list'>
        {categories.map((category, i) => (
          <NavItem
            i={i}
            category={category}
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
    </motion.nav>
  );
};

export default Dropdown;
