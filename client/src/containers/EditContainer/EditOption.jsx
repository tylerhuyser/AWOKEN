import React, { useState, useEffect } from 'react';

import './EditOption.css'

export default function EditOption(props) {
  
  const {currentUser, question, option, question_format, index, handleAnswerChange, submitAnswers, setSurveyAnswers } = props
  const { selectAllArray, setSelectAllArray } = props
  const optionID = option.id

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

  function routeHandleChange(e, optionID) {
    if (question_format !== "select all that apply") {
      handleAnswerChange(e, optionID)
    }
    else {
      handleSelectAllAnswerChange(e, optionID)
    }
  }

  const handleSelectAllAnswerChange = async (e, optionID) => {

    let { name, value } = e.target;

    if ((question_format === "select all that apply") && (name === "option_id")) {
      value = parseInt(value)

      if (selectAllArray.includes(parseInt(optionID))) {
          
          setSelectAllArray(prevState => {
            return (prevState.filter(e => e !== value))
          })
        
          setSelectAllAnswerData(prevState => ({
            ...prevState,
            option_id: []
          }))
          
      } else {
        
          setSelectAllArray(prevState => {
            return [...prevState, value]
          })
        
          setSelectAllAnswerData(prevState => ({
            ...prevState,
            option_id: value
          }))
        }
    }
    
    else if ((question_format === "select all that apply") && (name === "free_response")) {
        
      if (selectAllArray.includes(parseInt(optionID)) && value == "") {
          
        setSelectAllArray(prevState => {
            return (prevState.filter(e => e !== optionID))
          })
          
        setSelectAllAnswerData(prevState => ({
            ...prevState,
            option_id: [],
            free_response: ""
        }))
  
      } else if (selectAllArray.includes(parseInt(optionID)) && value !== "") {

        if (selectAllArray.includes(parseInt(optionID))) {
          
          setSelectAllAnswerData(prevState => ({
              ...prevState,
              free_response: value
          }))
        }
      } else {

        setSelectAllArray(prevState => {
          return [...prevState, parseInt(optionID)]
        })

        setSelectAllAnswerData(prevState => ({
          ...prevState,
          option_id: parseInt(optionID),
          free_response: value
          }))
      }
    }
  }

  function createOption() {
    if (option.option_copy === "Prefer to Self-Describe:") {
      
      return (
        <>
          
          <label
            htmlFor={`${option.option_copy}`}
            >
            {option.option_copy}
          </label>
          
          <textarea
            className="self-describe-textarea"
            id={`${option.option_copy}`} 
            name="free_response"
            rows={2}
            onChange={(e) => routeHandleChange(e, optionID)}
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
            name="option_id"
            value={option.id}
            onChange={(e) => routeHandleChange(e, optionID)}
            checked={true}
          />
            
          
          <label
            htmlFor={`${option.option_copy}`}
            >
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
            name="option_id"
            value={option.id}
            onChange={(e) => routeHandleChange(e, optionID)}
            checked={true}
          />
          
          <label
            htmlFor={`${option.option_copy}`}>
            {option.option_copy}
          </label>

        </div>
      )
    } 
  }

  const optionInput = createOption()

  return(

    <div className="option-container" key={`${optionID}`}>

      {optionInput}

    </div>

  )
}