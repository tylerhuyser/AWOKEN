import React from 'react';
import './PreLogin.css'

export default function PreLogin (props) {

  const { setBeginLogin } = props
  
  function handleGetStarted() {
    setBeginLogin(true);
  }


  return (
    <div className="preLogin-container">

      <div className="preLogin-content">

        <div className="logo-content">
          <img className="preLogin-logo-white fade-in-prelogin-logo" alt="preLogin-logo-white" src="https://i.imgur.com/6RLVBgP.png" />
          <p className="preLogin-App-Name fade-in-prelogin-logo">A<span className="woke-italics">WOKE</span>N</p>
        </div>

        <div className="preLogin-actions fade-in-pre-login-buttons">
          <p className="preLogin-tagline">Embrace New Perspectives</p>
          <button className="preLogin-get-started-button" onClick={handleGetStarted}>GET STARTED</button>
        </div>
      </div>

    </div>
  )
}