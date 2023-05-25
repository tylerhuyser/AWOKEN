import React from 'react'
import routeAnswerChange from '../router-functions/routeAnswerChange'

export default function createFreeResponseOption(question, answerData, setAnswerData) {

  let textareaProps = {
    className: "free-response-textarea",
    id: `${question.question_copy}`,
    key: `${question.id}`,
    name: "free_response",
    rows: 2,
    placeholder: "Enter below...",
    onChange: (e) => routeAnswerChange(e, answerData.option_id, question.question_format, setAnswerData),
    value: answerData.free_response
  }

  return React.createElement('div', {
    className: "option-container",
    key: `${question.id}`
  }, React.createElement('div', {
    className: "free-response-option-container",
    key: `${question.id}`
  }, React.createElement("textarea", {
    ...textareaProps
  })))
}