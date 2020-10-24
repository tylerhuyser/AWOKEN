import React, { useState } from 'react';
import Option from '../Option/Option.jsx'

import './Question.css'

export default function Questions(props) {

  const { currentUser, index, totalQuestions } = props
  const question_format = props.question.question_format


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
  
  const optionData = props.question.options.map((option, index) => (
    <Option
      
      option={option}
      index={index}
      answerData={answerData}
      setAnswerData={setAnswerData}
      question_format={question_format}
  
    />
  ))

  function createQuestionButton() {
    if (index === totalQuestions) {

      return (
      <button className="question-button">SUBMIT</button>
      )
    } else {

      return (

        <button className="question-button">CONTINUE</button>

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


  return (
    <div className="question-container">

      <div className="questionnaire-header-container">
      
        <div className="questionnaire-tabs-container">
       
          {questionnaireTabs}

        </div>

        <i className="fas fa-chevron-left white" />
        
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
  )
}