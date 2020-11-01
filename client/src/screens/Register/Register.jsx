import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerEmployee } from '../../services/auth';

import './Register.css'

export default function Register(props) {

  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    company_id: "",
    password: ""
  })

  const [validateUsername, setValidateUsername] = useState(false)
  const [validateFirstName, setValidateFirstName] = useState(false)
  const [validateLastName, setValidateLastName] = useState(false)
  const [validateEmail, setValidateEmail] = useState(false)
  const [validateDOB, setValidateDOB] = useState(false)
  const [validateCompanyName, setValidateCompanyName] = useState(false)
  const [validatePassword, setValidatePassword] = useState(false)

  console.log(props.error)
  console.log(props)

  const { username, first_name, last_name, email, date_of_birth, company_id, password } = formData;
  const { error, handleRegister, companyInfo } = props;

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "company_id") {
      value = parseInt(value)
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
    else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
  }

    // Register Validation Function

  const validateRegister = (e) => {
      
    e.preventDefault()

    if (!username) {
      //CHANGE CLASSNAME TO INVALID
      setValidateUsername(true);
      alert(`Please create a username.`);
      return false;
    }

    if (!first_name) {
      //CHANGE CLASSNAME TO INVALID
      setValidateUsername(false)
      setValidateFirstName(true);
      alert(`Please enter your first name.`);
      return false;
    }

    if (!last_name) {
      //CHANGE CLASSNAME TO INVALID
      setValidateFirstName(false);
      setValidateLastName(true);
      alert(`Please enter your last name.`);
      return false;
    }

    if (!email.includes("@") || !email.includes(".") || !email.includes("@.")) {
      //CHANGE CLASSNAME TO INVALID
      setValidateLastName(false);
      setValidateEmail(true);
      alert(`Please enter a valid email.`);
      return false;
    }
  
      if (date_of_birth.length !== 10) {
        //CHANGE CLASSNAME TO INVALID
        setValidateEmail(false);
        setValidateDOB(true);
        alert(`Please enter Location in MM/DD/YYYY format!`);
        return false;
      }
    
      if (!company_id) {
        //CHANGE CLASSNAME TO INVALID
        setValidateDOB(false);
        setValidateCompanyName(true);
        alert(`Please select your company.`);
        return false;
      }
    
      if (!password || password.length < 6) {
        //CHANGE CLASSNAME TO INVALID
        setValidateCompanyName(false);
        setValidatePassword(true);
        alert(`Your password must be at least six characters.`);
        return false;
      }
  
    if (username && first_name && last_name && email.includes("@") && email.includes(".") && !email.includes("@.") && date_of_birth.length === 10 && company_id && password.length >= 6) {
        setValidatePassword(false);
        handleRegister(formData)
      }
    }

  return (
    <div className="register-container">


      <div className="register-form-container">

        <div className="regiser-form-header">
            <Link to="/login"><i className="fas fa-chevron-left" /></Link>
            <img className="register-logo-orange" alt="login-wims-logo" src="https://i.imgur.com/ioUfIYI.png" />
            <p className="register-form-subtitle">BEGIN YOUR JOURNEY</p>
        </div> 

      <form className="register-form" onSubmit={(e)=>{
        validateRegister(e)
      }}>
        <p className="register-form-title">Register</p>
        {
          error &&
          <p className="register-error-message">{error}</p>
        }
        <label className="register-form-label">
          Username:
          <input
            className={validateUsername ? "register-form-input invalid" : "register-form-input"}
            type="text"
            value={username}
            name="username"
            onChange={handleChange}
          />
        </label>

        <label className="login-form-label">
            First Name:
          <input
            className={validateFirstName ? "register-form-input invalid" : "register-form-input"}
            type="text"
            value={first_name}
            name="first_name"
            onChange={handleChange}
          />
        </label>

        <label className="login-form-label">
            Last Name:
          <input
            className={validateLastName ? "register-form-input invalid" : "register-form-input"}
            type="text"
            value={last_name}
            name="last_name"
            onChange={handleChange}
          />
        </label>

        <label className="login-form-label">
          Email:
          <input
            className={validateEmail ? "register-form-input invalid" : "register-form-input"}
            type="text"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </label>

        <label className="login-form-label">
          Date of Birth (MM/DD/YYYY):
          <input
              className={validateDOB ? "register-form-input invalid" : "register-form-input"}
              type="text"
              value={date_of_birth}
              name="date_of_birth"
              onChange={handleChange}
              
          />
        </label>

        <label className="login-form-label">
          Company Name:
          <select className={validateCompanyName ? "register-form-input invalid" : "register-form-input"} defaultValue='default' name="company_id" onChange={handleChange}>
            <option disabled value='default'>-- Select Your Company--</option>
            {companyInfo.map(company => (
              <option value={company.id} key={company.id}>{company.company_name}</option>
            ))}
          </select>
        </label>

        <label className="login-form-label">
            Password:
          <input
            className={validatePassword ? "register-form-input invalid" : "register-form-input"}
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </label>

        <button className="register-button">Register</button>

        </form>
      </div>
    </div>
  )
}