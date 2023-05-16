import React from 'react'
import routeAnswerChange from '../routeAnswerChange'

export default function createInputOption(question, option, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData) {
  
  let inputProps = {
    type: 'checkbox',
    className: 'checkbox-input',
    id:`${option.option_copy}`,
    name: "option_id",
    value: `${option.id}`,
    onChange: (e) => routeAnswerChange(e, option.id, question.question_format, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData)
  }
  
  if (question.question_format !== "select all that apply") {
    inputProps.type = "radio"
    inputProps.className = "radio-input"
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

  // return (
  //   <div className="option-input-container" key={option.id}>
      
  //     <input
  //       type={question.question_format === "select all that apply" ? "checkbox" : "radio"}
  //       className={question.question_format === "select all that apply" ? "checkbox-input" : "radio-input"}
  //       id={`${option.option_copy}`}
  //       name="option_id"
  //       value={option.id}
  //       onChange={(e) => routeAnswerChange(e, option.id, question.question_format, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData)}
  //     />    
      
  //     <label
  //       htmlFor={`${option.option_copy}`}
  //       >
  //       {option.option_copy}
  //     </label>
  //   </div>
  // )
}