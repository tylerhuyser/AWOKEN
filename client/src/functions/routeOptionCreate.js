import createInputOption from "./JSX-creators/createInputOption.js";
import createFreeResponseOption from "./JSX-creators/createFreeResponseOption.js";
import createSelfDescribeOption from "./JSX-creators/createSelfDescribeOption.js";

export default function routeOptionCreate(question, option, answerData, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData) {
  if (question.question_format === "free-response") {
    return createFreeResponseOption(question, answerData, setAnswerData)
  }
  if (option.option_copy === "Prefer to Self-Describe:") {
    return  createSelfDescribeOption(question, option, answerData, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData)
  } else {
    return createInputOption(question, option, answerData, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData)
  }
}