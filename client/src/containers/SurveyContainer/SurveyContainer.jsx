import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Question from '../../components/Question/Question';
import Loader from '../../layout/Loader/Loader'

import handlePostNewSurvey from '../../functions/CRUD/POST/handlePostNewSurvey';
import handlePostAnswers from '../../functions/CRUD/POST/handlePostAnswers';

import { getOneSurveyFormat } from '../../services/survey-constructors'

import './SurveyContainer.css'

export default function SurveyContainer(props) {

  const { currentUser, surveyFormat } = props;
  const { setCompletedSurveys, setPendingSurvey } = props;

  const [surveyData, setSurveyData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [surveyID, setSurveyID] = useState(null)
  const [submitAnswers, setSubmitAnswers] = useState(false)
  const history = useHistory();
  
  const survey = {
    survey_format_id: surveyFormat?.id,
  }

  const [surveyAnswers, setSurveyAnswers] = useState([])

  useEffect(() => {
    console.log('SurveyContainer.js - UseEffect #1 - Gathering Survey Data')
    if (currentUser && surveyFormat) {
      const getSurveyData = async () => {
        const rawSurveyData = await getOneSurveyFormat(surveyFormat.id);
        console.log(rawSurveyData)
        setSurveyData(rawSurveyData)
      }
      getSurveyData(surveyFormat.id);
    }
  }, [currentUser, surveyFormat])


  useEffect(() => {
    if (surveyAnswers.length === 0 || !surveyData.questions) {
      return
    }
    if (surveyAnswers.length >= surveyData.questions.length) {
      handlePostNewSurvey(survey, setCompletedSurveys, setSurveyID) 
    } else {
      alert("Please complete all answers in order to continue!")
    }
  }, [surveyAnswers])

  useEffect(() => {
    if (surveyID !== null) {
      handlePostAnswers(surveyID, surveyAnswers, setPendingSurvey, history)
    }
  }, [surveyID])


  const surveyQuestionsJSX = surveyData.questions && surveyData.questions.map((question, index) => (
    <Question
    
      // Data
      key={question.id}
      currentUser={currentUser}
      question={question}
      index={index}
      totalQuestions={surveyData.questions.length - 1}

      // Functions
      currentQuestion={currentQuestion}
      setCurrentQuestion={setCurrentQuestion}

      // Switches
      submitAnswers={submitAnswers}
      setSubmitAnswers={setSubmitAnswers}
      setPendingSurvey={setPendingSurvey}

      // Data Forms
      survey={survey}
      surveyAnswers={surveyAnswers}
      setSurveyAnswers={setSurveyAnswers}
    
    />
  ))

  console.log(surveyData)

  return (

    <>
      
      { surveyData === undefined || !surveyFormat || surveyFormat.length === 0 || !surveyFormat.id  || !currentUser || currentUser === null || currentUser.length === 0 ?
      

        <Loader />
        
        :

        <div className={"questionnaire-container slide-in-left-survey-container"} key={`${surveyFormat.id}`}>
      
          {surveyQuestionsJSX}

        </div>

      }

    </>
  )
}