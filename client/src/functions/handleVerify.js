import {
  verifyEmployee,
} from "../services/auth"
import handleNavigation from './handleNavigation';

export default async function handleVerify (history, setCurrentUser) {

  const userData = await verifyEmployee();

  console.log('App.js - UseEffect #1 - Response post-Verify')
  console.log(`UserData:`)
  console.log(userData)

  setCurrentUser(userData);

  if (userData === null) {
    handleNavigation(history, "/");
  }
};