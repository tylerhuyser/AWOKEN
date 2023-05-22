import React from 'react'
import routeAnswerChange from '../routeAnswerChange'

export default function createInputOption(question, option, answerData, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData, selfDescribeVisibilitySwitch, setSelfDescribeVisibilitySwitch, editAnswer) {
  
  let inputProps = {
    type: 'checkbox',
    className: 'checkbox-input',
    id:`${option.option_copy}`,
    name: "option_id",
    value: `${option.id}`,
    onChange: (e) => routeAnswerChange(e, option.id, question.question_format, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData, selfDescribeVisibilitySwitch, setSelfDescribeVisibilitySwitch),
    checked: false
  }
  
  if (question.question_format !== "select all that apply") {
    inputProps.type = "radio"
    inputProps.className = "radio-input"
  }

  // if (editAnswer.option_id === option.id && (answerData.option_ID === editAnswer.option_ID || answerData.option_ID === [])) {
  //   inputProps.checked = true
  // }
  
  if (answerData.option_id === option.id || (question.question_format === "select all that apply" && selectAllArray.includes(option.id))) {
    inputProps.checked = true
  }

  if (editAnswer.option_id === option.id && answerData.option_id.legnth === 0) {
    inputProps.checked = true
  }
    
  return React.createElement('div', {
    className: "option-container",
    key: `${option.id}`
  }, React.createElement('div', {
    className: "input-option-container",
    key: `${option.id}`
  }, React.createElement('input', {
    ...inputProps
  }),
    React.createElement('label', {
    htmlFor: `${option.option_copy}`
  }, option.option_copy)))
}