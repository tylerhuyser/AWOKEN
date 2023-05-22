import { getSurveyAnswers } from "../../../services/answers";

export default async function gatherEditAnswers(editSurveyID, setEditAnswers) {
  const editAnswers = await getSurveyAnswers(editSurveyID)
  setEditAnswers(editAnswers.data.answers)
}