const handleAnswerChange = async (optionID, setAnswerData) => {
  setAnswerData(prevState => ({
    ...prevState,
    option_id: optionID,
    free_response: ""
  }))
}