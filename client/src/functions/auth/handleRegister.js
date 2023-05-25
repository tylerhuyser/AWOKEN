import {
  registerEmployee,
} from "../../services/auth"
import handleNavigation from '../handleNavigation';

export default async function handleRegister(registerData, history, setCurrentUser) {

  const employeeData = await registerEmployee(registerData);
    setCurrentUser(employeeData);
    handleNavigation(history, "/complete-profile");
};