import React, { useState, useEffect } from 'react';
import EditOption from './EditOption'
import { useHistory } from 'react-router-dom'

import './EditQuestion.css'

export default function EditQuestions(props) {

  const { currentUser, question, index, totalQuestions, handleSubmit, submitAnswers, originalAnswers } = props
  const { currentQuestion, setCurrentQuestion } = props
  const { surveyAnswers, setSurveyAnswers } = props
  const question_format = props.question.question_format
  const history = useHistory()

  const originalAnswer = originalAnswers[index]


  const [answerData, setAnswerData] = useState({
    id: originalAnswer.id,
    employee_id: currentUser.id,
    survey_id: [],
    question_id: question.id,
    option_id: originalAnswer.option_id,
    free_response: originalAnswer.free_response
  });

  useEffect(() => {
      setSurveyAnswers(prevState => ([...prevState, answerData]));
  }, [submitAnswers])

  const handleAnswerChange = async (e) => {
    // const optionID = answerData.option_id
    let { name, value } = e.target;
    // if ((question_format === "select all that apply") && (name === "option_id")) {
      
    //   if (optionID.includes(parseInt(value))) {
    //     const valueIndex = optionID.indexOf(parseInt(value))
    //     optionID.splice(valueIndex, 1)
    //   } else {
    //     optionID.push(parseInt(value))
    //   }
    //   value = optionID
    // }
    setAnswerData(prevState => ({
      ...prevState,
      [name]: value
    }))
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

  const questionButton = createQuestionButton(surveyAnswers)

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
          placeholder={originalAnswer.free_response}
          onChange={handleAnswerChange}
          value={answerData.free_response}
        />

      )
    } else if (question.question_format === "boolean" || question.question_format === "multiple-choice" || question.question_format === "select all that apply") {
      const options = question.options.map((option, index) => (
          <EditOption
      
            question={question.question_copy}
            option={option}
            index={index}

            handleAnswerChange={handleAnswerChange}
            question_format={question_format}
  
          />
        ))
        return options
        }
      }

      const optionData = createOptions(question)

  
  return (

    <>

      { currentQuestion === index ?

        <div className="edit-question-container" key={index}>

          <div className="questionnaire-header-container">
      
            <div className="questionnaire-tabs-container">
       
              {questionnaireTabs}

            </div>

            <i className="fas fa-chevron-left white" onClick={() => changeQuestion(-1)} />
        
          </div>

          <p className="questionnaire-title">Complete Your Profile:</p>

          <form className="question-form" id={`questionnaire-question-${props.question.id}`}>
        
            <p className="question-copy" id={`question-${props.question.id}`}>{props.question.question_copy}</p>

            <div className="options-container">
              {optionData}
            </div>
        
            {questionButton}

          </form>

        </div>
        
        :

        null
      }
      
    </>
  )
}