import { getOneEmployee } from "../services/admin-info";
import handleNavigation from './handleNavigation';

export default async function getEmployeeSurveys (userID, history, setCompletedSurveys) {
  const employee = await getOneEmployee(userID);
  const employeeSurveys = employee.surveys;
  setCompletedSurveys(employeeSurveys);
  if (employeeSurveys === null || employeeSurveys.length === 0) {
    handleNavigation(history, "/complete-profile");
  }
};