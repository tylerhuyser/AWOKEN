export default async function submitSurvey(submitAnswers, setSubmitAnswers, setSurveyAnswers) {
    setSurveyAnswers([])
    setSubmitAnswers(!submitAnswers)
}