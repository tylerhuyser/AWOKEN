import {
  verifyEmployee,
} from "../../services/auth"
import handleNavigation from '../handleNavigation';

export default async function handleVerify (history, setCurrentUser) {

  const userData = await verifyEmployee();

  setCurrentUser(userData);

  if (userData === null) {
    handleNavigation(history, "/");
  }
};