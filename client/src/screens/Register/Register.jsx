import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

  const { username, first_name, last_name, email, date_of_birth, password } = formData;
  const { error, handleRegister, companyInfo } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
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
        e.preventDefault();
        handleRegister(formData);
      }}>
        <p className="register-form-title">Register</p>
        {
          error &&
          <p className="register-error-message">{error}</p>
        }

        <label className="register-form-label">
          Username:
          <input
            className="register-form-input"
            type="text"
            value={username}
            name="username"
            onChange={handleChange}
          />
        </label>

        <label className="login-form-label">
            First Name:
          <input
            className="register-form-input"
            type="text"
            value={first_name}
            name="first_name"
            onChange={handleChange}
          />
        </label>

        <label className="login-form-label">
            Last Name:
          <input
            className="register-form-input"
            type="text"
            value={last_name}
            name="last_name"
            onChange={handleChange}
          />
        </label>

        <label className="login-form-label">
          Email:
          <input
            className="register-form-input"
            type="text"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </label>

        <label>
          Date of Birth (YYYY/MM/DD):
          <input
            className="register-form-input"
            type="text"
            value={date_of_birth}
            name="date_of_birth"
            onChange={handleChange}
          />
        </label>

        <label className="login-form-label">
          Company Name:
          <select className="register-form-input" defaultValue='default' name="company_id" onChange={handleChange}>
            <option disabled value='default'>-- Select Your Company--</option>
            {companyInfo.map(company => (
              <option value={company.id} key={company.id}>{company.company_name}</option>
            ))}
          </select>
        </label>

        <label className="login-form-label">
            Password:
          <input
            className="register-form-input"
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