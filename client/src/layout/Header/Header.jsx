import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css'

export default function Header(props) {
  const { currentUser, handleLogout } = props;

  return (
    <div className="header-container"> 
      <i className="far fa-user-circle" onClick={handleLogout}></i>
      <img alt="wims-logo" src="https://i.imgur.com/ioUfIYI.png" width="60vw" />
      <i className="fas fa-bars"></i>
    </div>
  )
}
