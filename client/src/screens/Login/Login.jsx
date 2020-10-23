import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import PreLogin from "./PreLogin.jsx"
import './Login.css'


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

  return (
    <div className="login-container">

      { beginLogin ?
 
      <div className="login-form-container">
        
      <form className="login-form" onSubmit={(e) => {
        e.preventDefault();
        handleLogin(formData);
      }}>
          
        <img alt="login-wims-logo" src="https://i.imgur.com/ioUfIYI.png" />
        <p className="login-tagline">EMBRACE NEW PERSPECTIVES</p>
        <p className="login-title">Login</p>
        {
          error &&
          <p className="login-error">{error}</p>
        }
        <label className="login-form-username">
            Username:
          <input
            type="text"
            value={username}
            name="username"
            onChange={handleChange}
          />
        </label>
        <label className="login-form-password">
            Password:
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </label>
        <button>SIGN IN</button>
      </form>

      <p className="forgot-password">Forgot your password?</p>

      <p className="register-copy">Don't have an account?</p>
      
      <Link to='/register'>SIGN UP</Link>
          
      </div>

        :
        
        <PreLogin setBeginLogin={setBeginLogin} />
    
      }

    </div>
  )
}