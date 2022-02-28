import React, { useState, useRef } from "react";
import { motion, useCycle, useAnimation, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import SearchBox from "../../utilities/searchBox/searchBox.component";
import "./header.styles.scss";
import Dropdown from "../dropdown/dropdown.component";
import UserPanel from "../userpanel/userpanel.component";
import { NavBarElement2 } from "../navBarElement/navBarElement.component";
import Logo from "../../promotional/logo/logo.component";
import NavBar from "../navbar/navbar.component";
import Hamburger from "../../svg/hamburger/hamburger.component";
import Snap from "../../svg/snap/snap.component";

const Header = () => {
  const menuButton = useRef();
  const [showMobileNav, toggleMobileNav] = useCycle(false, true);
  const { width } = useSelector((state) => state.dimensions);

  const breakpoint = 820;

  return (
    <div>
      {width < breakpoint ? (
        <header className='header'>
          <div className='userpanel userpanel--mobile'>
            <SearchBox />
            <NavBarElement2 to='/cart'>
              <i className='fas fa-shopping-cart'></i>
            </NavBarElement2>
          </div>
          <div className='mobile-navbar'>
            {!showMobileNav && <Snap />}
            <div
              className='mobile-navbar__button'
              ref={menuButton}
              onClick={toggleMobileNav}>
              <Hamburger opened={showMobileNav} />
            </div>
          </div>

          {showMobileNav && (
            <Dropdown
              showMobileNav
              menuButtonRef={menuButton}
              toggleMobileNav={toggleMobileNav}
            />
          )}
        </header>
      ) : (
        <header className='header'>
          <div className='userpanel'>
            <SearchBox />
            <div className='desktop-navbar__sociallinks'>
              <i className='fab fa-facebook'></i>
            </div>
            <UserPanel />
          </div>
          <div className='desktop-navbar'>
            <Logo />
            <NavBar />
          </div>
        </header>
      )}
    </div>
  );
};

export default Header;
