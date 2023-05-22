import handleNavigation from "../handleNavigation";

export default function handleEdit(editSurveyID, history) {
  handleNavigation(history, `/edit-journal/${editSurveyID}`)
};