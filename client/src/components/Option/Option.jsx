import React, {useState, useEffect} from 'react';

import routeAnswerChange from '../../functions/routeAnswerChange.js';

import './Option.css'

export default function Option(props) {
  
  const { currentUser, question, option, submitAnswers } = props
  const { setAnswerData, setSurveyAnswers } = props
  const { selectAllArray, setSelectAllArray } = props

  const [selectAllAnswerData, setSelectAllAnswerData] = useState({
    employee_id: currentUser.id,
    survey_id: [],
    question_id: question.id,
    option_id: [],
    free_response: ""
  });

  useEffect(() => {
    if ((selectAllAnswerData.option_id.length !== 0) || (selectAllAnswerData.free_response !== "")) {
      setSurveyAnswers(prevState => ([...prevState, selectAllAnswerData]));
    }
  }, [submitAnswers])
  
  function createOption() {
    if (option.option_copy === "Prefer to Self-Describe:") { 
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
    } else {
      return (
        <div className="option-input-container" key={option.id}>
          
          <input
            type={question.question_format === "select all that apply" ? "checkbox" : "radio"}
            className={question.question_format === "select all that apply" ? "checkbox-input" : "radio-input"}
            id={`${option.option_copy}`}
            name="option_id"
            value={option.id}
            onChange={(e) => routeAnswerChange(e, option.id, question.question_format, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData)}
          />    
          
          <label
            htmlFor={`${option.option_copy}`}
            >
            {option.option_copy}
          </label>
        </div>
      )
    }
  }

  const optionInput = createOption()

  return(

    <div className="option-container" key={`${option.id}`}>

      {optionInput}

    </div>

  )
}