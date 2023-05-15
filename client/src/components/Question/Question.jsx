import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

import Option from '../Option/Option.jsx'
import exitSurvey from '../../functions/switch-handler-functions/exitSurvey.js';

import routeAnswerChange from '../../functions/routeAnswerChange.js';
import handleAnswerChange from "../../functions/handle-change-functions/handleAnswerChange.js"
import changeQuestion from "../../functions/changeQuestion.js"

import createSurveyProgressMarkers from "../../functions/createSurveyProgressMarkers"

import './Question.css'

export default function Questions(props) {

  const { currentUser, question, index, totalQuestions, handleSubmit, survey, submitAnswers, setPendingSurvey } = props
  const { currentQuestion, setCurrentQuestion } = props
  const { surveyAnswers, setSurveyAnswers } = props
  const [selectAllArray, setSelectAllArray] = useState([])
  const history = useHistory()

  const [answerData, setAnswerData] = useState({
    employee_id: currentUser.id,
    survey_id: [],
    question_id: question.id,
    option_id: [],
    free_response: ""
  });

  useEffect(() => {
    if (question.question_format !== "select all that apply" && (answerData.option_id.length !== 0 || answerData.free_response !== "") ) {
      setSurveyAnswers(prevState => ([...prevState, answerData]));
    }
  }, [submitAnswers])

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
        <button className="question-button" onClick={() => changeQuestion(1, totalQuestions, currentQuestion, setCurrentQuestion, history)}>CONTINUE</button>
      )
    }
  }

  const questionButton = createQuestionButton(survey, surveyAnswers)

  const questionnaireTabs = createSurveyProgressMarkers(index, question, totalQuestions)
  
  function createOptions(question) {
    if (question.question_format === "free-response") {
      return (

        <textarea
          className="free-response-textarea"
          id={`${question.question_copy}`}
          key={`${question.id}`}
          name="free_response"
          rows={2}
          placeholder="Enter below..."
          onChange={(e) => routeAnswerChange(e, answerData.option_id, question.question_format, setAnswerData)}
          vale={answerData.free_response}
        />

      )
    } else if (question.question_format === "boolean" || question.question_format === "multiple-choice" || question.question_format === "select all that apply") {
      const options = question.options.map((option, index) => (
          <Option
      
          // Question & Option Info
            key={option.id}
            currentUser={currentUser}
            question={question}
            questionCopy={question.question_copy}
            option={option}
            index={index}

          // Answer Change Functionality
            handleAnswerChange={handleAnswerChange}
          
          // Answer Data
            submitAnswers={submitAnswers}
            setAnswerData={setAnswerData}
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

        <div className="question-container" key={`${question.id}`}>

          <div className="questionnaire-header-container">
      
            <div className="questionnaire-tabs-container">
       
              {questionnaireTabs}

            </div>

            {survey.survey_format_id === 1 && index === 0 ? <> </> :
              
              <>
              
              { index === 0 ?

                <i className="fas fa-chevron-left white" onClick={() => exitSurvey(history, setPendingSurvey)} key={`chevron-icon-${index}`} />
                
                :

                <i className="fas fa-chevron-left white" onClick={() => changeQuestion(-1, totalQuestions, currentQuestion, setCurrentQuestion, history)} key={`chevron-icon-${index}`} />
              
              }
                
              </>
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