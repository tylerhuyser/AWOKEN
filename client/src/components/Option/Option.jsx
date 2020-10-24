import React, { useState } from 'react';

import './Option.css'

export default function Option(props) {
  
  const { option, question_format } = props

  function createOption() {
    if (option.option_copy === "Prefer to Self-Describe:") {
      
      return (
        <>
          <label for={`${option.option_copy}`}>{option.option_copy}</label>
          <textarea
            className="self-describe-textarea"
            id={`${option.option_copy}`} 
            rows={2}
            placeholder="Share you identiy below..."
            id={`${option.option_copy}`}
            value={`${option.option_copy}`} />
        </>
      )
    } else if (question_format === "boolean" || question_format === "multiple-choice" || question_format === "likert") {
      
      return (
        <div className="option-input-container">
          <input type="radio" className="radio-input" id={`${option.option_copy}`} value={`${option.option_copy}`} />
          <label for={`${option.option_copy}`}>{option.option_copy}</label>
        </div>
      )
      
    } else if (question_format === "select all that apply") {

      return (
        <div className="option-input-container">
          <input type="checkbox" className="checkbox-input" id={`${option.option_copy}`} value={`${option.option_copy}`} />
          <label for={`${option.option_copy}`}>{option.option_copy}</label>
        </div>
      )
    } 
  }

  const optionInput = createOption()

  return(

    <div className="option-container">

      {optionInput}

    </div>

  )
}