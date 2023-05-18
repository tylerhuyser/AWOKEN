export default async function handleAnswerChange(optionID, setAnswerData, setSelfDescribeVisibilitySwitch) {
  setSelfDescribeVisibilitySwitch(false)
  setAnswerData(prevState => ({
    ...prevState,
    option_id: optionID,
    free_response: ""
  }))
}