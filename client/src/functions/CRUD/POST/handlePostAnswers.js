import { postAnswer } from "../../../services/answers";
import handleNavigation from "../../handleNavigation";

export default async function handlePostAnswers(surveyID, surveyAnswers, setPendingSurvey, history) {
  Promise.all(surveyAnswers.map((pendingAnswer) => {
    pendingAnswer.survey_id = surveyID
    const postAnswers = async (pendingAnswer) => {
      const newAnswer = await postAnswer(pendingAnswer)
      return newAnswer
    }
    return postAnswers(pendingAnswer)
  }))
  handleNavigation(history, "/home")
  setPendingSurvey(false)
}