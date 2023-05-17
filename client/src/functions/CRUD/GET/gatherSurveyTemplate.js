import { getOneSurveyFormat } from "../../../services/survey-constructors";

export default async function gatherSurveyTemplate(surveyFormat, setSurveyTemplate) {
  const surveyTemplate = await getOneSurveyFormat(surveyFormat.id)
    console.log(surveyTemplate)
    setSurveyTemplate(surveyTemplate)
}