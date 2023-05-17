import handleAnswerChange from "./handle-change-functions/handleAnswerChange"
import handleFreeResponseAnswerChange from "./handle-change-functions/handleFreeResponseAnswerChange"
import handleSelectAllAnswerChange from "./handle-change-functions/handleSelectAllAnswerChange"

export default function routeAnswerChange(e, optionID, questionFormat, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData) {
  console.log(e.target.name)
  if (questionFormat === "free_response" || e.target.name === "free-response") {
    console.log('free response')
    console.log(setAnswerData)
    handleFreeResponseAnswerChange(e, optionID, setAnswerData)
  }
  else if (questionFormat !== "select all that apply") {
    console.log('NOT select all')
    handleAnswerChange(optionID, setAnswerData)
  }
  else {
    console.log('select all')
    handleSelectAllAnswerChange(e, optionID, selectAllArray, setSelectAllArray, setSelectAllAnswerData)
  }
}