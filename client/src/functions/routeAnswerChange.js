import handleAnswerChange from "./handle-change-functions/handleAnswerChange"
import handleFreeResponseAnswerChange from "./handle-change-functions/handleFreeResponseAnswerChange"
import handleSelectAllAnswerChange from "./handle-change-functions/handleSelectAllAnswerChange"

export default function routeAnswerChange(e, optionID, questionFormat, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData, selfDescribeVisibilitySwitch, setSelfDescribeVisibilitySwitch) {
  if (questionFormat === "select all that apply") {
    console.log('Route-Answer-Change: Inside "Select All" Condition')
    handleSelectAllAnswerChange(e, optionID, selectAllArray, setSelectAllArray, setSelectAllAnswerData)
  }
  else if (questionFormat === "free_response" || e.target.name === "free_response") {
    console.log('Route-Answer-Change: Inside "Free Response" Condition')
    handleFreeResponseAnswerChange(e, optionID, setAnswerData)
  }
  else {
    console.log('Route-Answer-Change: Inside "FINAL" Condition')
    handleAnswerChange(optionID, setAnswerData, setSelfDescribeVisibilitySwitch)
  }
}