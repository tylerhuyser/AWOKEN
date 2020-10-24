import React, { useState } from 'react';

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
    <form onSubmit={(e)=>{
      e.preventDefault();
      handleRegister(formData);
    }}>
      <p className="register-title">Register</p>
      {
        error &&
        <p>{error}</p>
      }

      <label>
        Username:
        <input
          type="text"
          value={username}
          name="username"
          onChange={handleChange}
        />
      </label>

      <label>
        First Name:
        <input
          type="text"
          value={first_name}
          name="first_name"
          onChange={handleChange}
        />
      </label>

      <label>
        Last Name:
        <input
          type="text"
          value={last_name}
          name="last_name"
          onChange={handleChange}
        />
      </label>

      <label>
        Email:
        <input
          type="text"
          value={email}
          name="email"
          onChange={handleChange}
        />
      </label>

      <label>
        Date of Birth (YYYY/MM/DD):
        <input
          type="text"
          value={date_of_birth}
          name="date_of_birth"
          onChange={handleChange}
        />
      </label>

      <label>
        Company Name:
        <select defaultValue='default' name="company_id" onChange={handleChange}>
          <option disabled value='default'>-- Select Your Company--</option>
          {companyInfo.map(company => (
            <option value={company.id} key={company.id}>{company.company_name}</option>
          ))}
        </select>
      </label>

      <label>
        Password:
        <input
          type="password"
          value={password}
          name="password"
          onChange={handleChange}
        />
      </label>

      <button className="register">Register</button>

    </form>
  )
}