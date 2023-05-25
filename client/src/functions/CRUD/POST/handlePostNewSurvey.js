import { postSurvey } from "../../../services/surveys"

export default async function handlePostNewSurvey(surveyData, setCompletedSurveys, setSurveyID) {
  const newSurvey = await postSurvey(surveyData)
  setCompletedSurveys(prevState => [...prevState, newSurvey])
  setSurveyID(newSurvey.id)
  return newSurvey
}