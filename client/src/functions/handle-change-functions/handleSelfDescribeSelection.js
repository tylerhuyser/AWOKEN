export default function handleSelfDescribeSelection(optionID, questionFormat, answerData, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData, selfDescribeVisibilitySwitch, setSelfDescribeVisibilitySwitch) {
  if (questionFormat === "select all that apply" && selfDescribeVisibilitySwitch) {
    console.log("Handle-Select-Describe-Selection: Condition #1")
    setSelfDescribeVisibilitySwitch(false)
    setSelectAllArray(prevState => {
      return (prevState.filter(e => e !== parseInt(optionID)))
    })
    setSelectAllAnswerData(prevState => ({
      ...prevState,
      option_id: [],
      free_response: ""
  }))
  }
  else if (selfDescribeVisibilitySwitch || answerData.option_id === optionID) {
    console.log("Handle-Self-Describe-Selection: Condition #2")
    return
  }
  else if (!selfDescribeVisibilitySwitch) {
    console.log("Handle-Self-Describe-Selection: Condition #3")
    setSelfDescribeVisibilitySwitch(true)
    setAnswerData(prevState => ({
      ...prevState,
      option_id: [],
      free_response: ""
    }))
  }
}