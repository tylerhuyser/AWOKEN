const handleAnswerChange = async (e, optionID, setAnswerData) => {

  let {value } = e.target;

  setAnswerData(prevState => ({
    ...prevState,
    option_id: optionID,
    free_response: value
  }))
}