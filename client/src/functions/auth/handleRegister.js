import {
  registerEmployee,
} from "../../services/auth"
import handleNavigation from '../handleNavigation';

export default async function handleRegister(registerData, history, setCurrentUser, setPendingSurvey) {

  const employeeData = await registerEmployee(registerData);
    setCurrentUser(employeeData);
    setPendingSurvey(true);
    handleNavigation(history, "/complete-profile");
};