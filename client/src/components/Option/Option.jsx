import React from 'react';

import './Option.css'

export default function Option(props) {
  
  const { option, question_format, index, handleAnswerChange } = props


  function createOption() {
    if (option.option_copy === "Prefer to Self-Describe:") {
      
      return (
        <>
          
          <label
            htmlFor={`${option.option_copy}`}
            key={`label-${index}`}>
            {option.option_copy}
          </label>
          
          <textarea
            className="self-describe-textarea"
            id={`${option.option_copy}`} 
            key={index}
            name="free_response"
            rows={2}
            placeholder="Enter below..."
            onChange={handleAnswerChange}
            value={option.id} />
        </>
      )
    } else if (question_format === "boolean" || question_format === "multiple-choice" || question_format === "likert") {
      
      return (
        <div className="option-input-container" key={index}>
          
          <input
            type="radio"
            className="radio-input"
            id={`${option.option_copy}`}
            key={index}
            name="option_id"
            value={option.id}
            onChange={handleAnswerChange}
            // checked={checked? true : false}
          />
            
          
          <label
            htmlFor={`${option.option_copy}`}
            key={`label-${index}`}>
            {option.option_copy}
          </label>
        </div>
      )
      
    } else if (question_format === "select all that apply") {

      return (
        <div className="option-input-container" key={index}>
         
          <input
            type="checkbox"
            className="checkbox-input"
            id={`${option.option_copy}`}
            key={index}
            name="option_id"
            value={option.id}
            onChange={handleAnswerChange}
            // checked={checked ? true : false}
          />
          
          <label
            htmlFor={`${option.option_copy}`}
            key={`label-${index}`}>
            {option.option_copy}
          </label>

        </div>
      )
    } 
  }

  const optionInput = createOption()

  return(

    <div className="option-container" key={`${index}`}>

      {optionInput}

    </div>

  )
}