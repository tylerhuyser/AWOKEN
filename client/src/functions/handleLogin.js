import {
  loginEmployee,
} from "../services/auth";

import handleNavigation from './handleNavigation';

export default async function handleLogin(loginData, history, setCurrentUser, setError) {
  
  const employeeData = await loginEmployee(loginData);

  if (employeeData.errors) {

    setError(employeeData.errors)

  } else {
    setCurrentUser(employeeData);
    handleNavigation(history, '/home');
  }
};