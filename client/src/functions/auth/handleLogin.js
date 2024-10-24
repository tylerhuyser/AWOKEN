import {
  loginEmployee,
} from "../../services/auth";

import handleNavigation from '../handleNavigation';

export default async function handleLogin(loginData, history, setCurrentUser, setError) {

  if (loginData.username.length === 0 || loginData.password.length === 0) {

    console.log("No Credentials Entered.")
    setError('No Credentials Entered.')
    return

  } else {

    const employeeData = await loginEmployee(loginData);

    if (employeeData.errors) {
  
      setError(employeeData.errors)
  
    } else {
      setCurrentUser(employeeData);
      handleNavigation(history, '/home');
    }


  }
};