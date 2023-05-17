import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Question from '../../components/Question/Question';
import Loader from '../../layout/Loader/Loader'

import gatherSurveyTemplate from '../../functions/CRUD/GET/gatherSurveyTemplate';
import handlePostNewSurvey from '../../functions/CRUD/POST/handlePostNewSurvey';
import handlePostAnswers from '../../functions/CRUD/POST/handlePostAnswers';

import './SurveyContainer.css'

export default function SurveyContainer(props) {

  const { currentUser, surveyFormat } = props;
  const { setCompletedSurveys, setPendingSurvey } = props;

  // BELOW: Executes on Component Mount - GETs the Survey Template to generate Questions and Options fro User to make selections
  const [surveyTemplate, setSurveyTemplate] = useState([]);

  // BELOW: Counter for current Question rendered to the DOM and displayed to User
  const [questionCounter, setQuestionCounter] = useState(0)

  // BELOW: Switch to initiate POSTing of Completed Survey & Answers
  const [completeSurveySwitch, setCompleteSurveySwitch] = useState(false)

  // BELOW: Immediately after COMPLETESURVEYSWITCH changes, Answers are gathered in the below array, before POST Survey and POST Answer Executes
  const [completedSurveyAnswers, setCompletedSurveyAnswers] = useState([])
  
  // BELOW: Delivers the survey_format_id in Object format for POSTing the NEW Survey
  const survey = {
    survey_format_id: surveyFormat?.id,
  }

  // BELOW: After NEW Survey POSTed, the below ID is used to POST corresponding Answers
  const [surveyID, setSurveyID] = useState(null)

  const history = useHistory();

  useEffect(() => {
    console.log('SurveyContainer.js - UseEffect #1 - Gathering Survey Data')
    if (currentUser && surveyFormat) {
      gatherSurveyTemplate(surveyFormat, setSurveyTemplate)
    }
  }, [currentUser, surveyFormat])


  useEffect(() => {
    if (completedSurveyAnswers.length === 0 || !surveyTemplate.questions) {
      return
    }
    if (completedSurveyAnswers.length >= surveyTemplate.questions.length) {
      console.log('SurveyContainer.js - UseEffect #2 - Posting Survey Instance')
      handlePostNewSurvey(survey, setCompletedSurveys, setSurveyID) 
    } else {
      alert("Please complete all answers in order to continue!")
    }
  }, [completedSurveyAnswers])

  useEffect(() => {
    if (surveyID !== null) {
      console.log('SurveyContainer.js - UseEffect #3 - Posting Answers')
      handlePostAnswers(surveyID, completedSurveyAnswers, setPendingSurvey, history)
    }
  }, [surveyID])


  const surveyQuestionsJSX = surveyTemplate.questions && surveyTemplate.questions.map((question, index) => (
    <Question
    
      // Data
      key={question.id}
      currentUser={currentUser}
      question={question}
      index={index}
      totalQuestions={surveyTemplate.questions.length - 1}

      // Functions
      questionCounter={questionCounter}
      setQuestionCounter={setQuestionCounter}

      // Switches
      completeSurveySwitch={completeSurveySwitch}
      setCompleteSurveySwitch={setCompleteSurveySwitch}
      setPendingSurvey={setPendingSurvey}

      // Data Forms
      survey={survey}
      setCompletedSurveyAnswers={setCompletedSurveyAnswers}
    
    />
  ))

  console.log(surveyTemplate)

  return (

    <>
      
      { surveyTemplate && surveyTemplate.length <= 0 ?
      

        <Loader />
        
        :

        <div className={"survey-container slide-in-left-survey-container"} key={`${surveyFormat.id}`}>
      
          {surveyQuestionsJSX}

        </div>

      }

    </>
  )
}