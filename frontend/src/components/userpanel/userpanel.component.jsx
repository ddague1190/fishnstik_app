import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import './userpanel.styles.scss';
import {NavBarElement2 } from '../navBarElement/navBarElement.component';


const UserPanel = () => {

    let navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();

    
    const onLogoutClick = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <>
         {userInfo ? (
             <div className='userpanel__withuser'>
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
              <div className='userpanel__withoutuser' >
                   <NavBarElement2 to='/cart'>
                       <i class="fas fa-shopping-cart"></i>
                   </NavBarElement2>
                   <NavBarElement2 to='/login'>
                       <i className="fas fa-user"></i>
                   </NavBarElement2>
             </div>)
            }
        </>

    )
};

export default UserPanel;
