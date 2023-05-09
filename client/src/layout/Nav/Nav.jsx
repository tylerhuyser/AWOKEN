import React from 'react'
import { Link } from 'react-router-dom';
import './Nav.css'

export default function Nav(props) {
  
  const {toggleDesktopMenu } = props

  return (
      
    <div className={toggleDesktopMenu ? "navigation-container" : "navigation-container hidden"}>
      <Link className="navigation-link" to="/home">
          <i className="navigation-link-icon fas fa-home"></i>
          <p className="navigation-link-copy">Home</p>
      </Link>

      <Link className="navigation-link">
        <i className="navigation-link-icon fas fa-calendar-alt"></i>
        <p className="navigation-link-copy">Calendar</p>
      </Link>

      <Link className="navigation-link" to="/journals">
        <i className="navigation-link-icon fas fa-book"></i>
        <p className="navigation-link-copy">Journals</p>
      </Link>

      <Link className="navigation-link">
        <i className="navigation-link-icon fas fa-layer-group"></i>
        <p className="navigation-link-copy">Lessons</p>
      </Link>
    </div>

  )
}


