import React, { useState, useEffect } from 'react';
import { Link, useHistory} from 'react-router-dom';

import Carousel from "../../components/Carousel/Carousel"
import gifs from "../../content/login-carousel-gifs.json"

import handleLogin from '../../functions/auth/handleLogin.js';
import handleInputChange from '../../functions/handle-change-functions/handleInputChange.js';

import './Login.css'


export default function Login(props) {
  
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const [error, setError] = useState("")
  const history = useHistory();

  const  { setCurrentUser } = props

  useEffect(() => {
    if (error === "unauthorized") {
      alert("Invalid login credentials. Please check your username and/or password!")
    } else if (error === "No Credentials Entered.") {
      alert("Please enter login credentials. Please check your username and/or password!")
    }
  }, [error])

  return (
    <div className="login-container">

      <Carousel carouselType="login" data={gifs} />
 
      <div className="login-form-container">
          
        <div className="login-form-header-container">
          <img className="login-container-logo" alt="login-AWOKEN-logo" src="/images/logos/AWOKEN-logo-orange.png" />
          <p className="login-container-title">EMBRACE NEW PERSPECTIVES</p>
        </div> 
        
      <form className="login-form" onSubmit={(e) => {
        e.preventDefault();
        handleLogin(formData, history, setCurrentUser, setError);
      }}>

        <label className="login-form-label">
              Username:
          <input
            className={ error.length > 0 ? "login-form-input invalid" : "login-form-input"}
            type="text"
            value={formData.username}
            name="username"
            onChange={(e) => handleInputChange(e, setFormData)}
          />
        </label>
        <label className="login-form-label">
              Password:
          <input
            className={ error.length > 0 ? "login-form-input invalid" : "login-form-input"}
            type="password"
            value={formData.password}
            name="password"
            onChange={(e) => handleInputChange(e, setFormData)}
          />
        </label>
          <button className="sign-in-button">SIGN IN</button>
            
          {/* <p className="password-recovery-copy">Forgot your password?</p> */}
      </form>


        <div className="register-navigation-container">
          
          <p className="register-navigation-copy">Don't have an account?</p>
      
          <Link to='/register'><button className="register-navigation-button">SIGN UP</button></Link>
         </div>
          
      </div>

    </div>
  )
}