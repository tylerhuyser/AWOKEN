import React from 'react'
import Header from '../Header/Header.jsx'
import Nav from '../Nav/Nav.jsx'

import './Layout.css'

export default function Layout (props) {
  
  const { currentUser, handleLogout } = props;

  return (
    <div className="layout-container">
      <Header
        currentUser={currentUser}
        handleLogout={handleLogout}
      />
      {props.children}
      <Nav />
    </div>
  )
}
