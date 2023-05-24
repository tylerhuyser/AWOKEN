import React from 'react'
import routeAnswerChange from '../router-functions/routeAnswerChange'
import handleSelfDescribeSelection from '../handle-change-functions/handleSelfDescribeSelection'

export default function createSelfDescribeOption(question, option, answerData, setAnswerData, selectAllArray, setSelectAllArray, selectAllAnswerData, setSelectAllAnswerData, selfDescribeVisibilitySwitch, setSelfDescribeVisibilitySwitch) {

  let textareaProps = {
    className: 'self-describe-textarea hidden',
    id: `${option.option_copy}`,
    name: "free_response",
    rows: 2,
    onChange: (e) => routeAnswerChange(e, option.id, question.question_format, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData, selfDescribeVisibilitySwitch, setSelfDescribeVisibilitySwitch),
    value: answerData.free_response,
    placeholder: "Please share your self-described identity in the space below..."
  }

  if (question.question_format === "select all that apply") {
    textareaProps.value = selectAllAnswerData.free_response
  }

  let inputProps = {
    type: 'checkbox',
    className: 'checkbox-input',
    id:`${option.option_copy}`,
    name: "option_id",
    value: `${option.id}`,
    onChange: () => handleSelfDescribeSelection(option.id, question.question_format, answerData, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData, selfDescribeVisibilitySwitch, setSelfDescribeVisibilitySwitch),
    checked: false
  }

  if (question.question_format !== "select all that apply") {
    inputProps.type = "radio"
    inputProps.className = "radio-input"
  }

  if (selfDescribeVisibilitySwitch || answerData.option_id === option.id || (question.question_format === "select all that apply" && selectAllArray.includes(option.id))) {
    textareaProps.className = "self-describe-textarea visible"
    inputProps.checked = true
  }
  
  return React.createElement("div", {
    className: "option-container",
    key: `${option.id}`
  }, React.createElement("div", {
    className: "self-describe-option-container",
    key: `${option.id}`
  }, React.createElement('input', {
    ...inputProps
  }),
    React.createElement('label', {
      htmlFor: `${option.option_copy}`,
      className: "self-describe-label"
    }, option.option_copy)
  ), React.createElement('textarea', {
    ...textareaProps
  }))
}