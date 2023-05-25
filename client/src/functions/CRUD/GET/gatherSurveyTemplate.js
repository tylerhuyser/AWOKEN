import { getOneSurveyFormat } from "../../../services/survey-constructors";

export default async function gatherSurveyTemplate(surveyFormatID, setSurveyTemplate) {
  const surveyTemplate = await getOneSurveyFormat(surveyFormatID)
    setSurveyTemplate(surveyTemplate)
}