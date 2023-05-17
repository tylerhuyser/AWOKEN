import React from 'react'
import routeAnswerChange from '../routeAnswerChange'

export default function creatSelfDescribeOption(question, option, answerData, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData) {

  let textareaProps = {
    className: 'self-describe-textarea',
    id: `${option.option_copy}`,
    name: "free-response",
    rows: 2,
    onChange: (e) => routeAnswerChange(e, option.id, question.question_format, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData),
    value: answerData.free_response
  }

  return React.createElement("label", {
    htmlFor: `${option.option_copy}`,
    className: "self-describe-label",
    value: option.id,
  }, `${option.option_copy}`, React.createElement("textarea", {
    ...textareaProps
  }))
}