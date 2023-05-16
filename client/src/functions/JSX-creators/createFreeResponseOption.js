import React from 'react'
import routeAnswerChange from '../routeAnswerChange'

export default function createFreeResponseOption(question, answerData, setAnswerData) {
  return (
    <textarea
      className="free-response-textarea"
      id={`${question.question_copy}`}
      key={`${question.id}`}
      name="free_response"
      rows={2}
      placeholder="Enter below..."
      onChange={(e) => routeAnswerChange(e, answerData.option_id, question.question_format, setAnswerData)}
      vale={answerData.free_response}
    />
  )
}