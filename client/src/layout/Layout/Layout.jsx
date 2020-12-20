import React, { useState } from 'react'
import Header from '../Header/Header.jsx'
import Nav from '../Nav/Nav.jsx'
import Footer from '../Footer/Footer.jsx'

import './Layout.css'

export default function Layout(props) {
  
  const [toggleDesktopMenu, setToggleDesktopMenu] = useState(false)
  
  const { currentUser, handleLogout } = props;

  return (
    <>
      <div className="layout-container-mobile">
        <Header
          currentUser={currentUser}
          handleLogout={handleLogout}
          toggleDesktopMenu={toggleDesktopMenu}
          setToggleDesktopMenu={setToggleDesktopMenu}
        />

        {props.children}

        <Nav
          toggleDesktopMenu={toggleDesktopMenu}
          setToggleDesktopMenu={setToggleDesktopMenu}
        />
      </div>

      <div className="layout-container-desktop">

        <Header
          currentUser={currentUser}
          handleLogout={handleLogout}
          toggleDesktopMenu={toggleDesktopMenu}
          setToggleDesktopMenu={setToggleDesktopMenu}
        />

        <div className="desktop-layout-floater"></div>

        {props.children}

        <Footer />

        <Nav
          toggleDesktopMenu={toggleDesktopMenu}
          setToggleDesktopMenu={setToggleDesktopMenu}
        />
    </div>

    </>
  )
}
