import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import PreLogin from "./PreLogin.jsx"
import './Login.css'
import { useEffect } from 'react';


export default function Login(props) {
  
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const [beginLogin, setBeginLogin] = useState(false);
  
  const { username, password } = formData;
  const { error, handleLogin } = props;

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  useEffect(() => {
    if (error === "unauthorized") {
      alert("Invalid login credentials. Please check your username and/or password!")
    }
  }, [error])

  return (
    <div className="login-container">

      { beginLogin ?
 
      <div className="login-form-container">
          
        <div className="login-form-header">
          <img className="login-logo-orange" alt="login-wims-logo" src="https://i.imgur.com/ioUfIYI.png" />
          <p className="login-header-subtitle">EMBRACE NEW PERSPECTIVES</p>
        </div> 
        
      <form className="login-form" onSubmit={(e) => {
        e.preventDefault();
        handleLogin(formData);
      }}>
            
        <p className="login-form-title">LOGIN</p>

        <label className="login-form-label">
              Username:
          <input
            className={ error === "unauthorized" ? "login-form-input invalid" : "login-form-input"}
            type="text"
            value={username}
            name="username"
            onChange={handleChange}
          />
        </label>
        <label className="login-form-label">
              Password:
          <input
            className={ error === "unauthorized" ? "login-form-input invalid" : "login-form-input"}
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
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

        :
        
        <PreLogin setBeginLogin={setBeginLogin} />
    
      }

    </div>
  )
}