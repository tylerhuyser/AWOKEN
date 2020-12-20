import React, { useState } from 'react'
import Header from '../Header/Header.jsx'
import Nav from '../Nav/Nav.jsx'
import Footer from '../Footer/Footer.jsx'

import './Layout.css'

export default function Layout(props) {
  
  const [toggleDesktopMenu, setToggleDesktopMenu] = useState(false)
  
  const { currentUser, handleLogout } = props;

  return (
    <div className="layout-container">
      <Header
        currentUser={currentUser}
        handleLogout={handleLogout}
        toggleDesktopMenu={toggleDesktopMenu}
        setToggleDesktopMenu={setToggleDesktopMenu}
      />

      {props.children}

      <Footer />

      <Nav
        toggleDesktopMenu={toggleDesktopMenu}
        setToggleDesktopMenu={setToggleDesktopMenu}
      />
    </div>
  )
}
