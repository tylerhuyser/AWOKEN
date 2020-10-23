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
          <img className="preLogin-logo-white" alt="preLogin-logo-white" src="https://i.imgur.com/6RLVBgP.png" />
          <p classname="preLogin-App-Name">A<span className="woke-italics">WOKE</span>N</p>
        </div>

        <div className="preLogin-actions">
          <p className="preLogin-tagline">Embrace New Perspectives</p>
          <button onClick={handleGetStarted}>Get Started</button>
        </div>
      </div>

    </div>
  )
}