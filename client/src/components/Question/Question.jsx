import React, { useState, useEffect } from 'react';
import Option from '../Option/Option.jsx'
import { useHistory } from 'react-router-dom'

import './Question.css'

export default function Questions(props) {

  const { currentUser, question, index, totalQuestions, handleSubmit, survey, submitAnswers } = props
  const { currentQuestion, setCurrentQuestion } = props
  const { surveyAnswers, setSurveyAnswers } = props
  const [selectAllArray, setSelectAllArray] = useState([])
  const question_format = props.question.question_format
  const history = useHistory()

  const [answerData, setAnswerData] = useState({
    employee_id: currentUser.id,
    survey_id: [],
    question_id: question.id,
    option_id: [],
    free_response: ""
  });

  useEffect(() => {
    if ((answerData.option_id.length !== 0) || (answerData.free_response !== "")) {
      setSurveyAnswers(prevState => ([...prevState, answerData]));
    }
  }, [submitAnswers])

  const handleAnswerChange = async (e, props) => {
    // const optionID = answerData.option_id
    let { name, value } = e.target;
    
    console.log(e)
    console.log(props)
    if (name === "free_response") {
      setAnswerData(prevState => ({
        ...prevState,
        option_id: props,
        free_response: value
      }))
    } 
    else if (question_format === "boolean" || question_format === "multiple-choice") {
      setAnswerData(prevState => ({
        ...prevState,
        option_id: props,
        free_response: ""
      }))
    }

    // if ((question_format === "select all that apply") && (name === "option_id")) {
      
    //   if (optionID.includes(parseInt(value))) {
    //     const valueIndex = optionID.indexOf(parseInt(value))
    //     optionID.splice(valueIndex, 1)
    //   } else {
    //     optionID.push(parseInt(value))
    //   }
    //   value = optionID
    // }

    // setAnswerData(prevState => ({
    //   ...prevState,
    //   [name]: value
    // }))
  }

  function changeQuestion(n) {
    
    if ((n === (-1)) && (currentQuestion === 0)) {
      history.push('/')
    } else if ((n === (-1)) && (currentQuestion !== 0)) {
      setCurrentQuestion(currentQuestion - 1)
    } else if ((n === 1) && (currentQuestion !== totalQuestions)) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  function createQuestionButton(survey, surveyAnswers) {
    if (index === totalQuestions) {

      return (
        <button className="question-button" onClick={(e) => {
          e.preventDefault();
          handleSubmit(survey, surveyAnswers);
        }}>SUBMIT</button>
      )
    } else {

      return (
        <button className="question-button" onClick={() => changeQuestion(1)}>CONTINUE</button>
      )
    }
  }

  const questionButton = createQuestionButton(survey, surveyAnswers)

  function createQuestionnaireTabs() {
    let tabs = []
    for (let i = 0; i <= totalQuestions; i++) {
      if (i === index) {
        tabs[i] = <span className="questionnaire-tab active" key={`${i}`}></span>
      } else {
        tabs[i] = <span className="questionnaire-tab inactive" key={`${i}`}></span>
      }
    }
    return tabs
  }

  const questionnaireTabs = createQuestionnaireTabs()
  
  function createOptions(question) {
    if (question.question_format === "free-response") {
      return (

        <textarea
          className="free-response-textarea"
          id={`${question.question_copy}`}
          key={index}
          name="free_response"
          rows={2}
          placeholder="Enter below..."
          onChange={handleAnswerChange}
          value={answerData.free_response}
        />

      )
    } else if (question.question_format === "boolean" || question.question_format === "multiple-choice" || question.question_format === "select all that apply") {
      const options = question.options.map((option, index) => (
          <Option
      
          // Question & Option Info
            currentUser={currentUser}
            question={question}
            questionCopy={question.question_copy}
            question_format={question_format}
            option={option}
            index={index}

          // Answer Change Functionality
            handleAnswerChange={handleAnswerChange}
          
          // Answer Data
            submitAnswers={submitAnswers}
            setSurveyAnswers={setSurveyAnswers}
          
          // Select-All-Answers
            selectAllArray={selectAllArray}
            setSelectAllArray={setSelectAllArray}
  
          />
        ))
        return options
        }
      }

      const optionData = createOptions(question)

  
  return (

    <>

      { currentQuestion === index ?

        <div className="question-container" key={`question-container-${index}`}>

          <div className="questionnaire-header-container" key={`question-container-header-${index}`}>
      
            <div className="questionnaire-tabs-container" key={`questionnaire-tabs-container-${index}`}>
       
              {questionnaireTabs}

            </div>

            <i className="fas fa-chevron-left white" onClick={() => changeQuestion(-1)} key={`chevron-icon-${index}`} />
        
          </div>

          <p className="questionnaire-title" key={`question-title-${index}`}>Complete Your Profile:</p>

          <div className="question-form" id={`questionnaire-question-${props.question.id}`} key= {`question-question-${index}`}>
        
            <p className="question-copy" id={`question-${props.question.id}`} key={`question-copy-${index}`} >{props.question.question_copy}</p>

            <div className="options-container" key={`options-container-${index}`}>
              {optionData}
            </div>
        
            {questionButton}

          </div>

        </div>
        
        :

        null
      }
      
    </>
  )
}