import React from 'react'
import routeAnswerChange from '../routeAnswerChange'

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

  return React.createElement("textarea", {
    ...textareaProps
  })
}