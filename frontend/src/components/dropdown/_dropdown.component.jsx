import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import './dropdown.styles.scss';
import { categories, subcategories } from './categories';



const Dropdown = () => {
  return (
    <Navbar>
      <NavItem icon={<PlusIcon />} />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<MessengerIcon />} />

      <NavItem icon={<CaretIcon />}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();



  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem({children, goToMenu, path, ...otherProps}) {

    const onDropdownItemClick = () => {
        if(goToMenu) setActiveMenu(goToMenu)

        if(path) navigate(`/products/${path}`)
    }

    return (
      <div className="menu-item" onClick={onDropdownItemClick}>
        <span className="icon-button">{otherProps.leftIcon}</span>
        {children}
        <span className="icon-right">{otherProps.rightIcon}</span>
      </div>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
    
    <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
        {categories.map((category) => 

          <DropdownItem
            path={category.category}
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu={category.category}>
            {category.title}
          </DropdownItem>

)}
 
        </div>
      </CSSTransition>

  

    {categories.map((category)=> 

    



      <CSSTransition
        key={category.category}
        in={activeMenu === category.category}
        timeout={500}
        className="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>{category.title}</h2>
          </DropdownItem>
          {subcategories[category.category].map((subcategory) => 
          <DropdownItem path={`${category.category}/${subcategory.subcategory}/`} key={subcategory.subcategory} leftIcon={<BoltIcon />}>{subcategory.title}</DropdownItem>
          )}
        </div>
      </CSSTransition>
            
    )}
    </div>
  );
}

export default Dropdown;
