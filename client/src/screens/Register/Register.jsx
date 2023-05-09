import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Carousel from "../../components/Carousel/Carousel"
import images from "../../content/register-carousel-images.json"

import handleRegister from '../../functions/auth/handleRegister.js';
import validateRegister from '../../functions/validateRegister'
import handleInputChange from '../../functions/handleInputChange.js';

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
  const history = useHistory();

  const { companyInfo, setCurrentUser, setPendingSurvey } = props;

  return (
    <div className="register-container">

      <Carousel carouselType="register" data={images} />

      <div className="register-form-container">

        <div className="register-form-header-container">
            <Link className="register-back-button-container" to="/login"><i className="fas fa-times" id="register-back-button" /></Link>
            <img className="register-container-logo" alt="register-AWOKEN-logo" src="/images/logos/AWOKEN-logo-orange.png" />
            <p className="register-container-title">BEGIN YOUR JOURNEY</p>
        </div> 

      <form className="register-form" onSubmit={(e)=>{
        validateRegister(e, handleRegister, formData, history, setCurrentUser, setPendingSurvey)
      }}>

        <label className="register-form-label">
          Username:
          <input
            className="register-form-input"
            id="register-form-username-input"
            type="text"
            value={formData.username}
            name="username"
            onChange={(e)=> handleInputChange(e, setFormData)}
          />
        </label>

        <label className="register-form-label">
            First Name:
          <input
            className="register-form-input"
            id="register-form-first-name-input"
            type="text"
            value={formData.first_name}
            name="first_name"
            onChange={(e)=> handleInputChange(e, setFormData)}
          />
        </label>

        <label className="register-form-label">
            Last Name:
          <input
            className="register-form-input"
            id="register-form-late-name-input"
            type="text"
            value={formData.last_name}
            name="last_name"
            onChange={(e)=> handleInputChange(e, setFormData)}
          />
        </label>

        <label className="register-form-label">
          Email:
          <input
            className="register-form-input"
            id="register-form-email-input"
            type="text"
            value={formData.email}
            name="email"
            onChange={(e)=> handleInputChange(e, setFormData)}
          />
        </label>

        <label className="register-form-label">
          Date of Birth (MM/DD/YYYY):
          <input
              className="register-form-input"
              id="register-form-date-of-birth-input"
              type="text"
              value={formData.date_of_birth}
              name="date_of_birth"
              onChange={(e)=> handleInputChange(e, setFormData)}
              
          />
        </label>

        <label className="register-form-label">
          Company Name:
            
            <select
              className="register-form-input"
              id="register-form-company-input"
              defaultValue='default'
              name="company_id"
              onChange={(e) => handleInputChange(e, setFormData)}>
              
            <option disabled value='default'>-- Select Your Company--</option>
            {companyInfo.map(company => (
              <option value={parseInt(company.id)} key={company.id}>{company.company_name}</option>
            ))}
              
          </select>
        </label>

        <label className="register-form-label">
            Password:
          <input
            className="register-form-input"
            id="register-form-password-input"
            type="password"
            value={formData.password}
            name="password"
            onChange={(e)=> handleInputChange(e, setFormData)}
          />
        </label>

        <button className="register-button">Register</button>

        </form>
      </div>
    </div>
  )
}