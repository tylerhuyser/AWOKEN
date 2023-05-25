import handleNavigation from "../../handleNavigation";
import routeEditAnswers from "../../router-functions/routeEditAnswers";

export default async function handleEditSurvey(surveyTemplate, completedSurveyAnswers, editAnswers, history) {
  console.log('Inside HandleEditSurvey')
  console.log('Initiating RouteEditAnswers')
  await routeEditAnswers(surveyTemplate, completedSurveyAnswers, editAnswers)
  handleNavigation(history, '/journals')
}