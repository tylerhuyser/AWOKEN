import React, { useState } from 'react'
import Header from '../Header/Header.jsx'
import Nav from '../Nav/Nav.jsx'
import Footer from '../Footer/Footer.jsx'
import Loader from '../Loader/Loader.jsx'

import './Layout.css'

export default function Layout(props) {
  
  const [toggleDesktopMenu, setToggleDesktopMenu] = useState(false)
  
  const { currentUser, setCurrentUser } = props;

  return (

    <>
      
      {currentUser ? 
        
        <div className="layout-container">

          <Header
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            toggleDesktopMenu={toggleDesktopMenu}
            setToggleDesktopMenu={setToggleDesktopMenu}
          />
    
          <div className='body-container'>
            {props.children}
          </div>
    
          <Footer />
    
          <Nav
            toggleDesktopMenu={toggleDesktopMenu}
          />
    
        </div>
      

        :

        <Loader />

      }
    
    </>

  )
}
