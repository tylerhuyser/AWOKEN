import { postAnswer } from "../../../services/answers";
import handleNavigation from "../../handleNavigation";

export default async function handlePostAnswers(surveyID, completedSurveyAnswers, history) {
  Promise.all(
    await completedSurveyAnswers.map((pendingAnswer) => {
    pendingAnswer.survey_id = surveyID
    const postAnswers = async (pendingAnswer) => {
      const newAnswer = await postAnswer(pendingAnswer)
      return newAnswer
    }
    console.log(postAnswers)
    return postAnswers(pendingAnswer)
  }))
  handleNavigation(history, "/home")
}