import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Question from '../../components/Question/Question';

import { getOneSurveyFormat } from '../../services/survey-constructors'
import { postSurvey } from '../../services/surveys';
import { postAnswer } from '../../services/answers';

import './SurveyContainer.css'

export default function SurveyContainer(props) {

  const { currentUser, surveyFormat, setCompletedSurveys, setPendingSurvey } = props;
  const [surveyData, setSurveyData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [surveyID, setSurveyID] = useState(null)
  const [submitAnswers, setSubmitAnswers] = useState(false)
  const history = useHistory();
  
  const survey = {
    survey_format_id: surveyFormat?.id,
  }

  const [surveyAnswers, setSurveyAnswers] = useState([])

  // Submit Survey & Answers Functions

  const postNewSurvey = async (surveyData) => {
    const newSurvey = await postSurvey(surveyData)
    setCompletedSurveys(prevState => [...prevState, newSurvey])
    return newSurvey
  }

  const handleSubmit = async (survey) => {
    setSurveyAnswers([])
    setSubmitAnswers(!submitAnswers)
  }

  // Return Home Function

  const exitSurvey = () => {
    setPendingSurvey(false)
    history.push('/home')
  }

  // UseEffects Below:

  // Grabs Survey-specific data including questions & options

  useEffect(() => {
    console.log('SurveyContainer.js - UseEffect #1 - Gathering Survey Data')
    if (currentUser && surveyFormat) {
      const getSurveyData = async () => {
        const rawSurveyData = await getOneSurveyFormat(surveyFormat.id);
        setSurveyData(rawSurveyData)
      }
      getSurveyData(surveyFormat.id);
    }
  }, [currentUser, surveyFormat])

  useEffect(() => {
    if (surveyAnswers.length !== 0 && surveyData.questions !== undefined) {
      if (surveyAnswers.length >= surveyData.questions.length) {
        const handlePost = async (survey, surveyAnswers) => {
          const newSurvey = await postNewSurvey(survey)
          const newSurveyID = newSurvey.id
          setSurveyID(newSurveyID)
        }
        handlePost(survey, surveyAnswers)
      } else {
        alert("Please complete all answers in order to continue!")
      }
    }
  }, [surveyAnswers])

  useEffect(() => {
    if (surveyID !== null) {
      Promise.all(surveyAnswers.map((pendingAnswer) => {
        pendingAnswer.survey_id = surveyID
        const postAnswers = async (pendingAnswer) => {
          const newAnswer = await postAnswer(pendingAnswer);
          return newAnswer
        }
        return postAnswers(pendingAnswer)
      }))
      history.push('/home')
      setPendingSurvey(false)
    }
  }, [surveyID])


  const surveyQuestions = surveyData.questions && surveyData.questions.map((question, index) => (
    <Question
    
      // Data
      key={question.id}
      currentUser={currentUser}
      question={question}
      index={index}
      totalQuestions={surveyData.questions.length - 1}

      // Functions
      handleSubmit={handleSubmit}
      currentQuestion={currentQuestion}
      setCurrentQuestion={setCurrentQuestion}
      submitAnswers={submitAnswers}
      exitSurvey={exitSurvey}

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
      

        <div className="loader slide-in-left-survey-container"></div>
        
        :

        <div className={"questionnaire-container slide-in-left-survey-container"} key={`${surveyFormat.id}`}>
      
          {surveyQuestions}

        </div>

      }

    </>
  )
}