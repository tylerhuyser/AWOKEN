import React, { useState, useEffect } from 'react';
import { Link, useHistory} from 'react-router-dom';

import handleLogin from '../../functions/handleLogin.js';

import handleInputChange from '../../functions/handleInputChange.js';

import './Login.css'


export default function Login(props) {
  
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const [error, setError] = useState("")
  const history = useHistory();

  const {setCurrentUser} = props

  useEffect(() => {
    if (error === "unauthorized") {
      alert("Invalid login credentials. Please check your username and/or password!")
    }
  }, [error])

  return (
    <div className="login-container">
 
      <div className="login-form-container">
          
        <div className="login-form-header">
          <img className="login-logo-orange" alt="login-wims-logo" src="https://i.imgur.com/ioUfIYI.png" />
          <p className="login-header-subtitle">EMBRACE NEW PERSPECTIVES</p>
        </div> 
        
      <form className="login-form" onSubmit={(e) => {
        e.preventDefault();
        handleLogin(formData, history, setCurrentUser, setError);
      }}>
            
        <p className="login-form-title">LOGIN</p>

        <label className="login-form-label">
              Username:
          <input
            className={ error === "unauthorized" ? "login-form-input invalid" : "login-form-input"}
            type="text"
            value={formData.username}
            name="username"
            onChange={(e) => handleInputChange(e, setFormData)}
          />
        </label>
        <label className="login-form-label">
              Password:
          <input
            className={ error === "unauthorized" ? "login-form-input invalid" : "login-form-input"}
            type="password"
            value={formData.password}
            name="password"
            onChange={(e) => handleInputChange(e, setFormData)}
          />
        </label>
          <button className="sign-in-button">SIGN IN</button>
            
          <p className="password-recovery-copy">Forgot your password?</p>
      </form>


        <div className="register-prompt-container">
          
          <p className="register-prompt-copy">Don't have an account?</p>
      
          <Link to='/register'><button className="register-button">SIGN UP</button></Link>
         </div>
          
      </div>

    </div>
  )
}