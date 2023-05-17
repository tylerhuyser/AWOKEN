import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

import Option from '../Option/Option.jsx'
import createSurveyProgressMarkers from "../../functions/JSX-creators/createSurveyProgressMarkers"
import createQuestionButton from '../../functions/JSX-creators/createQuestionButton';

import changeQuestion from "../../functions/changeQuestion.js"
import exitSurvey from '../../functions/switch-handler-functions/exitSurvey.js';

import './Question.css'

export default function Questions(props) {

  const { currentUser, question, index, totalQuestions, survey, setPendingSurvey } = props
  const { currentQuestion, setCurrentQuestion } = props
  const { surveyAnswers, setSurveyAnswers } = props
  const { submitAnswers, setSubmitAnswers } = props
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

  const surveyProgressMarkersJSX = createSurveyProgressMarkers(index, question, totalQuestions)

  const optionsJSX = question.options.map(option => (
    <Option
      
    // Question & Option Info
      key={option.id}
      currentUser={currentUser}
      question={question}
      option={option}
      index={index}
    
    // Switches
      submitAnswers={submitAnswers}
    
    // Answers
      answerData={answerData}
      setAnswerData={setAnswerData}
      setSurveyAnswers={setSurveyAnswers}
    
    // Select-All
      selectAllArray={selectAllArray}
      setSelectAllArray={setSelectAllArray}

    />
  ))

  const questionButtonJSX = createQuestionButton(index, totalQuestions, currentQuestion, setCurrentQuestion, submitAnswers, setSubmitAnswers, setSurveyAnswers, history)

  
  return (

    <>

      { currentQuestion === index ?

        <div className="question-container" key={`${question.id}`}>

          <div className="questionnaire-header-container">
      
            <div className="questionnaire-tabs-container">
       
              {surveyProgressMarkersJSX}

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
              {optionsJSX}
            </div>
        
            {questionButtonJSX}

          </div>

        </div>
        
        :

        <></>

      }
      
    </>
  )
}