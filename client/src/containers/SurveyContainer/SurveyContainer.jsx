import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Question from '../../components/Question/Question';

import { getOneSurveyFormat } from '../../services/survey-constructors'
import { postSurvey } from '../../services/surveys';
import { postAnswer } from '../../services/answers';

export default function SurveyContainer(props) {

  const { currentUser, surveyFormat, setUserSurveys, setPendingSurvey } = props;
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
    setUserSurveys(prevState => [...prevState, newSurvey])
    return newSurvey
  }

  const handleSubmit = async (survey) => {
    setSurveyAnswers([])
    setSubmitAnswers(!submitAnswers)
  }

  // Return Home Function

  const exitSurvey = () => {
    history.push('/home')
    setPendingSurvey(false)
  }

  // UseEffects Below:

  // Grabs Survey-specific data including questions & options

  useEffect(() => {
    if (surveyFormat !== null) {
      const getSurveyData = async () => {
        const rawSurveyData = await getOneSurveyFormat(surveyFormat.id);
        setSurveyData(rawSurveyData)
      }
      getSurveyData(surveyFormat.id);
    }
  }, [])

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

  return (

    <>
      
      { surveyData === undefined ?
      

        <div className="loader"></div>
        
        :

        <div className="questionnaire-container" key={`${surveyFormat.id}`}>
      
          {surveyQuestions}

        </div>

      }

    </>
  )
}