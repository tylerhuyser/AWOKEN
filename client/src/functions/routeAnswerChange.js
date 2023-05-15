import handleAnswerChange from "./handle-change-functions/handleAnswerChange"
import handleFreeResponseAnswerChange from "./handle-change-functions/handleFreeResponseAnswerChange"
import handleSelectAllAnswerChange from "./handle-change-functions/handleSelectAllAnswerChange"

export default function routeAnswerChange (e, optionID, questionFormat, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData) {
  if (questionFormat === "free_response") {
    handleFreeResponseAnswerChange(e, optionID, setAnswerData)
  }
  if (questionFormat !== "select all that apply") {
    handleAnswerChange(optionID, setAnswerData)
  }
  else {
    handleSelectAllAnswerChange(e, optionID, selectAllArray, setSelectAllArray, setSelectAllAnswerData)
  }
}