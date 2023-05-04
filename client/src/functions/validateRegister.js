export default function validateRegister(e, handleRegister, formData, history, setCurrentUser, setPendingSurvey) {
      
  e.preventDefault()
  
  if (!formData.username) {
    let invalid = document.querySelector('.invalid')
    invalid.classList.remove('invalid')
    let usernameInput = document.querySelector('#register-form-username-input')
    usernameInput.classList.add('invalid')
    alert(`Please create a username.`);
    return false;
  }
  
  if (!formData.first_name) {
    let usernameInput = document.querySelector('#register-form-username-input')
    usernameInput.classList.remove('invalid')
    let firstNameInput = document.querySelector('#register-form-first-name-input')
    firstNameInput.classList.add('invalid')
    alert(`Please enter your first name.`);
    return false;
  }
  
  if (!formData.last_name) {
    let firstNameInput = document.querySelector('#register-form-first-name-input')
    firstNameInput.classList.remove('invalid')
    let lastNameInput = document.querySelector('#register-form-last-name-input')
    lastNameInput.classList.add('invalid')
    alert(`Please enter your last name.`);
    return false;
  }
  
  if (!formData.email.includes("@") || !formData.email.includes(".") || formData.email.includes("@.")) {
    let lastNameInput = document.querySelector('#register-form-last-name-input')
    lastNameInput.classList.remove('invalid')
    let emailInput = document.querySelector('#register-form-email-input')
    emailInput.classList.add('invalid')
    alert(`Please enter a valid email.`);
    return false;
  }
    
  if (formData.date_of_birth.length !== 10) {
    let emailInput = document.querySelector('#register-form-email-input')
    emailInput.classList.remove('invalid')
    let dateOfBirthInput = document.querySelector('#register-form-date-of-birth-input')
    dateOfBirthInput.classList.add('invalid')
    alert(`Please enter Location in MM/DD/YYYY format!`);
    return false;
  }
      
  if (!formData.company_id) {
    let dateOfBirthInput = document.querySelector('#register-form-date-of-birth-input')
    dateOfBirthInput.classList.remove('invalid')
    let companyInput = document.querySelector('#register-form-company-input')
    companyInput.classList.add('invalid')
    alert(`Please select your company.`);
    return false;
  }
      
  if (!formData.password || formData.password.length < 6) {
    let companyInput = document.querySelector('#register-form-company-input')
    companyInput.classList.remove('invalid')
    let passwordInput = document.querySelector('#register-form-password-input')
    passwordInput.classList.add('invalid')
    alert(`Your password must be at least six characters.`);
    return false;
  }
    
  if (formData.username && formData.first_name && formData.last_name && formData.email.includes("@") && formData.email.includes(".") && !formData.email.includes("@.") && formData.date_of_birth.length === 10 && formData.company_id && formData.password.length >= 6) {
    handleRegister(formData, history, setCurrentUser, setPendingSurvey)
  }
}