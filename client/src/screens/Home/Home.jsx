import React from 'react'
import { Link } from 'react-router-dom';

import './Home.css'


export default function Home(props) {
  

  return (
    <div className="home-container">
      
      <div className="home-card">

        <p className="home-card-title">NOTIFICATIONS</p>

        <div className="home-card-content">
          <p className="home-card-copy">Let's get started!</p>
          <p className="home-card-copy">Complete Your Onboarding Assement</p>
          <Link to="new-journal"><button className="journal-button">BEGIN</button></Link>
        </div>

      </div>



    </div>
  )
}