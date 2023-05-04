import React from 'react';
import { useHistory } from "react-router-dom";

import './LandingPage.css'

export default function LandingPage() {
  
  const history = useHistory();
  
  function handleGetStarted() {
    history.push('/login')
  }


  return (
    <div className="landing-page-container">

      <div className="landing-page-content">

        <div className="logo-content">
          <img className="landing-page-logo-white fade-in-prelogin-logo" alt="preLogin-logo-white" src="https://i.imgur.com/6RLVBgP.png" />
          <p className="landing-page-app-name fade-in-prelogin-logo">A<span className="woke-italics">WOKE</span>N</p>
        </div>

        <div className="landing-page-actions-container fade-in-pre-login-buttons">
          <p className="landing-page-tagline">Embrace New Perspectives</p>
          <button className="landing-page-login-button" onClick={handleGetStarted}>GET STARTED</button>
        </div>
      </div>

    </div>
  )
}