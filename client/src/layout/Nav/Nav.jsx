import React from 'react'
import { Link } from 'react-router-dom';
import './Nav.css'

export default function Nav(props) {
  
  const {toggleDesktopMenu, setToggleDesktopMenu } = props

  return (
    <>
      <div className="nav-container-mobile slide-in-bottom-nav">
        <Link to="/home"><i className="fas fa-home"></i></Link>
        <i className="fas fa-calendar-alt"></i>
        <Link to="/journals"><i className="fas fa-book"></i></Link>
        <i className="fas fa-layer-group"></i>
        <i className="fas fa-bell"></i>
      </div>

      <div className={toggleDesktopMenu ? "nav-container-desktop scale-in-hor-left" : "nav-container-hidden"} >
        <Link to="/home">
          <i className="fas fa-home"></i>
          Home
        </Link>

        <Link>
          <i className="fas fa-calendar-alt"></i>
          Calender
        </Link>

        <Link to="/journals">
          <i className="fas fa-book"></i>
          Journals
        </Link>

        <Link>
          <i className="fas fa-layer-group"></i>
          Lessons
        </Link>

      </div>
    </>
    )
}


