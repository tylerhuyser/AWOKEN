import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'

import Option from '../Option/Option.jsx'
import createSurveyProgressMarkers from "../../functions/JSX-creators/createSurveyProgressMarkers"
import createQuestionButton from '../../functions/JSX-creators/createQuestionButton';
import createFreeResponseOption from '../../functions/JSX-creators/createFreeResponseOption.js';

import changeQuestion from "../../functions/changeQuestion.js"
import exitSurvey from '../../functions/switch-handler-functions/exitSurvey.js';

import './Question.css'


export default function Questions(props) {

  // Current User
  const { currentUser } = props

  // Survey, Questions(s) & Answers
  const { survey } = props
  const { question, totalQuestions, index } = props
  const { editAnswers } = props
  const [selectAllArray, setSelectAllArray] = useState([])
  const [answerData, setAnswerData] = useState({
    employee_id: currentUser.id,
    survey_id: [],
    question_id: question.id,
    option_id: [],
    free_response: ""
  });

  // Switches & Counters
  const { completedSurveyAnswers, setCompletedSurveyAnswers } = props
  const { completeSurveySwitch, setCompleteSurveySwitch } = props
  const { questionCounter, setQuestionCounter } = props
  const [selfDescribeVisibilitySwitch, setSelfDescribeVisibilitySwitch] = useState(false)
  
  const history = useHistory()
  const params = useParams()

  useEffect(() => {
    if (question.question_format !== "select all that apply" && (answerData.option_id && answerData.option_id.length !== 0 || answerData.free_response !== "") ) {
      setCompletedSurveyAnswers(prevState => ([...prevState, answerData]));
    }
  }, [completeSurveySwitch])

  useEffect(() => {
    if (editAnswers.length > 0 && question.question_format !== "select all that apply" && answerData.option_id.length === 0) {
      setAnswerData(prevState => ({
        ...prevState,
        survey_id: editAnswers[0].survey_id,
        option_id: editAnswers[0].option_id,
        free_response: editAnswers[0].free_response
      }))
    }
  }, [])

  useEffect(() => {
    if (editAnswers.length > 0 && question.question_format === "select all that apply") {
      let previousSelectAllAnswers = []
      editAnswers.forEach((answer, index) => previousSelectAllAnswers.push(answer[index].option_id))
      setSelectAllArray(previousSelectAllAnswers)
    }
  }, [editAnswers])

  const surveyProgressMarkersJSX = createSurveyProgressMarkers(index, totalQuestions)

  const optionsJSX = question.options.map(option => (
    <Option
      
    // Question & Option Info
      key={option.id}
      currentUser={currentUser}
      question={question}
      option={option}
      index={index}
    
    // Switches
      completeSurveySwitch={completeSurveySwitch}
      selfDescribeVisibilitySwitch={selfDescribeVisibilitySwitch}
      setSelfDescribeVisibilitySwitch={setSelfDescribeVisibilitySwitch}
    
    // Answers
      answerData={answerData}
      setAnswerData={setAnswerData}
      completedSurveyAnswers={completedSurveyAnswers}
      setCompletedSurveyAnswers={setCompletedSurveyAnswers}
    
    // Select-All
      selectAllArray={selectAllArray}
      setSelectAllArray={setSelectAllArray}

    // Edit
      editAnswer={editAnswers.filter(answer => answer.option_id === option.id)}
      
    />
  ))

  const freeResponseOptionJSX = createFreeResponseOption(question, answerData, setAnswerData)

  const questionButtonJSX = createQuestionButton(index, totalQuestions, questionCounter, setQuestionCounter, completeSurveySwitch, setCompleteSurveySwitch, setCompletedSurveyAnswers, history)

  
  return (

    <>

      { questionCounter === index ?

        <div className="question-container" key={`${question.id}`}>

          <div className="survey-header-container">

          {survey.survey_format_id === 1 && index === 0 ? <> </> :
              
              <>
              
              { index === 0 ?

                <i className="fas fa-chevron-left survey-navigation-button" id="exit-survey-button" onClick={() => exitSurvey(history, params)} key={`chevron-icon-${index}`} />
                
                :

                <i className="fas fa-chevron-left survey-navigation-button" id="previous-question-button" onClick={() => changeQuestion(-1, totalQuestions, questionCounter, setQuestionCounter, history)} key={`chevron-icon-${index}`} />
              
              }
                
              </>
            }
      
            <div className="survey-progress-markers-container">
       
              {surveyProgressMarkersJSX}

            </div>

          </div>

          <p className="survey-title">Complete Your Profile:</p>
        
          <p className="question-copy" id={`question-${props.question.id}`}>{props.question.question_copy}</p>

          <div className="options-container">
            {question.question_format === "free-response" ? freeResponseOptionJSX : optionsJSX}
          </div>
        
          {questionButtonJSX}

        </div>
        
        :

        <></>

      }
      
    </>
  )
}