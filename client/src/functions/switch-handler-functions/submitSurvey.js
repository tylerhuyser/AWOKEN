export default async function submitSurvey(completeSurveySwitch, setCompleteSurveySwitch, setCompletedSurveyAnswers) {
    setCompletedSurveyAnswers([])
    setCompleteSurveySwitch(!completeSurveySwitch)
}