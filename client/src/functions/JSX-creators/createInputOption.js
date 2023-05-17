import React from 'react'
import routeAnswerChange from '../routeAnswerChange'

export default function createInputOption(question, option, answerData, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData) {
  
  let inputProps = {
    type: 'checkbox',
    className: 'checkbox-input',
    id:`${option.option_copy}`,
    name: "option_id",
    value: `${option.id}`,
    onChange: (e) => routeAnswerChange(e, option.id, question.question_format, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData),
    checked: false
  }
  
  if (question.question_format !== "select all that apply") {
    inputProps.type = "radio"
    inputProps.className = "radio-input"
  }
  
  if (answerData.option_id === option.id || (question.question_format === "select all that apply" && answerData.option_id.includes(option.id))) {
    inputProps.checked = true
  }
    
  return React.createElement('div', {
    className: "option-input-container",
    key: `${option.id}`
  }, React.createElement('input', {
    ...inputProps
  }),
    React.createElement('label', {
    htmlFor: `${option.option_copy}`
  }, option.option_copy))
}