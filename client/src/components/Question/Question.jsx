import React, { useState } from 'react';
import Option from '../Option/Option.jsx'
import { useHistory } from 'react-router-dom'

import './Question.css'

export default function Questions(props) {

  const { currentUser, index, totalQuestions } = props
  const { currentQuestion, setCurrentQuestion } = props
  const question_format = props.question.question_format
  const history = useHistory()


  const [answerData, setAnswerData] = useState({
    employee_id: currentUser,
    survey_id: [],
    question_id: props.question.id,
    option_id: [],
    free_response: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
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

  function createQuestionButton() {
    if (index === totalQuestions) {

      return (
      <button className="question-button">SUBMIT</button>
      )
    } else {

      return (

        <button className="question-button" onClick={() => changeQuestion(1)}>CONTINUE</button>

      )
    }
  }

  const questionButton = createQuestionButton()

  function createQuestionnaireTabs() {
    let tabs = []
    for (let i = 0; i <= totalQuestions; i++) {
      if (i === index) {
            tabs[i] = <span className="questionnaire-tab active"></span>
      } else {
          tabs[i] = <span className="questionnaire-tab inactive"></span>
      }
    }
    return tabs
  }

  const questionnaireTabs = createQuestionnaireTabs()
  
  const optionData = props.question.options.map((option, index) => (
    <Option
      
      option={option}
      index={index}
      answerData={answerData}
      setAnswerData={setAnswerData}
      question_format={question_format}
  
    />
  ))

  
  return (

    <>

      { currentQuestion === index ?

        <div className="question-container">

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