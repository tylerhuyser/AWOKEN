export default async function handleAnswerChange(optionID, setAnswerData) {
  setAnswerData(prevState => ({
    ...prevState,
    option_id: optionID,
    free_response: ""
  }))
}