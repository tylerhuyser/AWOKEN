import {
  removeToken,
} from "../../services/auth"
import handleNavigation from '../handleNavigation';

export default function handleLogout (history, setCurrentUser) {
  setCurrentUser(null);
  localStorage.removeItem("authToken");
  removeToken();
  handleNavigation(history, '/login');
};