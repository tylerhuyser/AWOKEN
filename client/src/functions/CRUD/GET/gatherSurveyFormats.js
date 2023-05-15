import { getAllSurveyFormats } from "../../../services/survey-constructors.js";

export default async function getSurveyFormats(setSurveyFormats) {
  const surveyFormatData = await getAllSurveyFormats();
  setSurveyFormats(surveyFormatData);
};