import React, { useState, useEffect } from 'react';
import EditOption from './EditOption'
import { useHistory } from 'react-router-dom'

// import './EditQuestion.css'

export default function EditQuestions(props) {

  const { currentUser, question, index, totalQuestions, handleSubmit, submitAnswers, originalAnswers, exitSurvey } = props
  const { currentQuestion, setCurrentQuestion } = props
  const { surveyAnswers, setSurveyAnswers } = props
  const [selectAllArray, setSelectAllArray] = useState([])
  const question_format = props.question.question_format
  const history = useHistory()

  const originalAnswer = originalAnswers[index]

  const [answerData, setAnswerData] = useState({
    id: originalAnswer.id,
    employee_id: currentUser.id,
    survey_id: originalAnswer.survey_id,
    question_id: question.id,
    option_id: originalAnswer.option_id,
    free_response: originalAnswer.free_response
  });

  useEffect(() => {
      setSurveyAnswers(prevState => ([...prevState, answerData]));
  }, [submitAnswers])

  const handleAnswerChange = async (e, props) => {
    
    let { name, value } = e.target;
    
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
        <button className="edit-question-button" onClick={(e) => {
          e.preventDefault();
          handleSubmit(survey, surveyAnswers);
        }}>SUBMIT</button>
      )
    } else {

      return (
        <button className="edit-question-button" onClick={() => changeQuestion(1)}>CONTINUE</button>
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
          className="edit-free-response-textarea"
          id={`${question.question_copy}`}
          name="free_response"
          rows={2}
          onChange={handleAnswerChange}
          value={answerData.free_response}
        >
          {answerData.free_response}
        </textarea>

      )
    } else if (question.question_format === "boolean" || question.question_format === "multiple-choice" || question.question_format === "select all that apply") {
      const options = question.options.map((option, index) => (
          <EditOption
      
            key={option.id}
            currentUser={currentUser}
            question={question.question_copy}
            questionCopy={question.question_copy}
            question_format={question_format}
            option={option}
            index={index}

            handleAnswerChange={handleAnswerChange}

            submitAnswers={submitAnswers}
            setSurveyAnswers={setSurveyAnswers}
          
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

        <div className="edit-question-container" key={question.id}>

          <div className="questionnaire-header-container">
      
            <div className="questionnaire-tabs-container">
       
              {questionnaireTabs}

            </div>
              
              { index === 0 ?

                <i className="fas fa-chevron-left white" onClick={exitSurvey} key={`chevron-icon-${index}`} />
                
                :

                <i className="fas fa-chevron-left white" onClick={() => changeQuestion(-1)} key={`chevron-icon-${index}`} />
              
              }
        
          </div>

          <p className="questionnaire-title">Complete Your Profile:</p>

          <div className="question-form" id={`questionnaire-question-${props.question.id}`}>
        
            <p className="question-copy" id={`question-${props.question.id}`}>{props.question.question_copy}</p>

            <div className="options-container">
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