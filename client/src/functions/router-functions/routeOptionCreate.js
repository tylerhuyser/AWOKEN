import createInputOption from "../JSX-creators/createInputOption.js";
import createFreeResponseOption from "../JSX-creators/createFreeResponseOption.js";
import createSelfDescribeOption from "../JSX-creators/createSelfDescribeOption.js";

export default function routeOptionCreate(question, option, answerData, setAnswerData, selectAllArray, setSelectAllArray, selectAllAnswerData, setSelectAllAnswerData, selfDescribeVisibilitySwitch, setSelfDescribeVisibilitySwitch) {
  console.log('INSIDE RouteOptionCreate')
  if (question.question_format === "free-response") {
    console.log('RouteOptionCreate: Creating Free Response Option')
    return createFreeResponseOption(question, answerData, setAnswerData)
  }
  else if (option.option_copy === "Prefer to Self-Describe:") {
    console.log('RouteOptionCreate: Creating Self Describe Option')
    return  createSelfDescribeOption(question, option, answerData, setAnswerData, selectAllArray, setSelectAllArray, selectAllAnswerData, setSelectAllAnswerData, selfDescribeVisibilitySwitch, setSelfDescribeVisibilitySwitch)
  }
  else {
    console.log('RouteOptionCreate: Creating Radio or Checkbox Option')
    return createInputOption(question, option, answerData, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData, selfDescribeVisibilitySwitch, setSelfDescribeVisibilitySwitch)
  } 
}