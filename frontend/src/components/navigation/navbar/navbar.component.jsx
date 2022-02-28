import React, { useState, useEffect, useRef } from "react";
import {createPortal} from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.styles.scss";
import { categories, subcategories } from "../dropdown/categories";
import { motion } from "framer-motion";

const NavItem = ({ category, setShowMobileNav }) => {
  const [hidden, setHidden] = useState(true);

  return (
    <li className='desktop-nav-item'>
      <Link
        className='desktop-nav-item__link btn--navbar'
        to={`products/${category.category}/`}>
        {category.title}
      </Link>
      <motion.ul 
      className='desktop-nav-submenu'>
        <svg className='desktop-nav-submenu__triangle' height='10' width='200'>
          <path fill='white' d='M150 0 L75 200 L225 200 Z' />
        </svg>

        {subcategories[category.category].map((subcategory) => (
          <li
            className='desktop-nav-submenu-item'
            key={subcategory.subcategory}>
            <Link
              className='desktop-nav-submenu-item__link'
              to={`products/${category.category}/${subcategory.subcategory}/`}>
              {subcategory.title}
            </Link>
          </li>
        ))}
      </motion.ul>
    </li>
  );
};

const NavBar = () => {
  return createPortal(
    <nav className='desktop-nav'>
      <ul className='desktop-nav-list'>
        {categories.map((category) => (
          <NavItem category={category} key={category.category} />
        ))}
      </ul>
    </nav>, document.body
  );
};

export default NavBar;
