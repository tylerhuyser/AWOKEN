import React from 'react'
import routeAnswerChange from '../routeAnswerChange'

export default function creatSelfDescribeOption(question, option, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData) {
  return (
    <> 
      <label
        htmlFor={`${option.option_copy}`}
        className="self-describe-label"
        value={option.id}>
        {option.option_copy}
      </label>
      
      <textarea
        className="self-describe-textarea"
        id={`${option.option_copy}`} 
        name="free_response"
        rows={2}
        onChange={(e) => routeAnswerChange(e, option.id, question.question_format, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData)}
         />
    </>
  )
}