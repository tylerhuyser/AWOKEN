import handleNavigation from "../handleNavigation";

export default function editSurvey(editSurveyID, history) {
  handleNavigation(history, `/edit-journal/${editSurveyID}`)
};