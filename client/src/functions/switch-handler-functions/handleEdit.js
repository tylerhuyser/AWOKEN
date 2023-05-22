import handleNavigation from "../handleNavigation";

export default function handleEdit(editSurveyID, setEditSurveyID, setEditSurvey, history) {
  setEditSurveyID(editSurveyID);
  // setEditSurvey(true)
  handleNavigation(history, '/edit-journal')

};