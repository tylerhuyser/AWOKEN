import React from 'react'
import { Link } from 'react-router-dom';
import './Nav.css'

export default function Nav () {

    return (
      <div className="nav-container slide-in-bottom-nav">
        <Link to="/home"><i className="fas fa-home"></i></Link>
        <i className="fas fa-calendar-alt"></i>
        <Link to="/journals"><i className="fas fa-book"></i></Link>
        <i className="fas fa-layer-group"></i>
        <i className="fas fa-bell"></i>
      </div>
    )
}


