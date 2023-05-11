import React from 'react';
import { useHistory } from 'react-router-dom';
import handleLogout from '../../functions/auth/handleLogout';

import './Header.css'

export default function Header(props) {

  const { toggleDesktopMenu, setToggleDesktopMenu } = props
  const { currentUser, setCurrentUser } = props;

  const history = useHistory();

  const changeDesktopMenuVisibility = (e) => {
    e.preventDefault();
    setToggleDesktopMenu(!toggleDesktopMenu)
  }

  return (
      
    <div className="header-container"> 
        
      <div className='header-menu-icon-container'>
        <i className="header-icon mobile fas fa-bars" id="header-menu-icon"></i>
        {toggleDesktopMenu ? <i className="header-icon desktop fas fa-times" id="header-menu-icon" onClick={changeDesktopMenuVisibility}></i> : <i className="header-icon desktop fas fa-bars" id="header-menu-icon" onClick={changeDesktopMenuVisibility}></i>}
      </div>

      <div className='header-logo-container'>
        <img className='header-logo' alt="AWOKEN-header-logo" src="/images/logos/AWOKEN-logo-orange.png" />
      </div>
        
      <div className="header-current-user-container">
        <i className="header-icon mobile far fa-user-circle" onClick={() => handleLogout(history, setCurrentUser)}></i>
        <i className="header-icon desktop fas fa-bell"></i>
        <div className="current-user-name desktop" onClick={() => handleLogout(history, setCurrentUser)}>{currentUser.first_name} {currentUser.last_name}</div>
      </div>
        
    </div>
  )
}
