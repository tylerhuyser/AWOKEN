import React from 'react';
import {useHistory} from 'react-router-dom';
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

    <>

    <div className="header-container-mobile slide-in-top-header mobile"> 
      <i className="fas fa-bars"></i>
      <img alt="wims-logo" src="https://i.imgur.com/ioUfIYI.png" width="60vw" />
      <i className="far fa-user-circle" onClick={() => handleLogout(history, setCurrentUser)}></i>
    </div>

    <div className="header-container-desktop slide-in-top-header desktop">
      
      <div className="menu-login-container">
          
          {toggleDesktopMenu ? <i className="fas fa-times" onClick={changeDesktopMenuVisibility}></i> : <i className="fas fa-bars" onClick={changeDesktopMenuVisibility}></i>}
          
        <img alt="wims-logo" src="https://i.imgur.com/ioUfIYI.png" width="50vw" />
      </div>
        
      <div className="current-user-header-container">
        <i className="fas fa-bell"></i>
        <div className="current-user-name" onClick={handleLogout}>{currentUser.first_name} {currentUser.last_name}</div>
      </div>
        
    </div>
      
    </>
  )
}
