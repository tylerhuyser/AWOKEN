import React from 'react';
import { useHistory } from "react-router-dom";
import Carousel from '../../components/Carousel/Carousel';
import handleNavigation from '../../functions/handleNavigation';
import quotes from "../../content/landing-page-quotes.json"

import './LandingPage.css'

export default function LandingPage() {
  
  const history = useHistory();

  return (
    <div className="landing-page-container">

      <div className="landing-page-content">

        <div className="logo-content">
          <img className="landing-page-logo-white fade-in-prelogin-logo" alt="preLogin-logo-white" src="/images/logos/AWOKEN-logo-white.png" />
          <p className="landing-page-app-name fade-in-prelogin-logo">A<span className="woke-italics">WOKE</span>N</p>
        </div>

        <div className="landing-page-actions-container fade-in-pre-login-buttons">
          <p className="landing-page-tagline">Embrace New Perspectives</p>
          <button className="landing-page-login-button" onClick={() => handleNavigation(history, '/login')}>GET STARTED</button>
        </div>
      </div>

      <Carousel carouselType={"landing page"} data={quotes} />

    </div>
  )
}