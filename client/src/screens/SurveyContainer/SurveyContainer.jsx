import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Question from '../../components/Question/Question';

import { getOneSurveyFormat } from '../../services/survey-constructors'
import { postSurvey, putSurvey, destroySurvey } from '../../services/surveys';
import { postAnswer, putAnswer, destroyAnswer } from '../../services/answers';

export default function SurveyContainer(props) {

  const { currentUser, surveyFormat, setUserSurveys, setPendingSurvey } = props;
  const [surveyData, setSurveyData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [surveyID, setSurveyID] = useState(null)
  const [submitAnswers, setSubmitAnswers] = useState(false)
  const history = useHistory();

  console.log(surveyFormat)
  
  const survey = {
    survey_format_id: surveyFormat?.id,
  }

  const [surveyAnswers, setSurveyAnswers] = useState([])

  // Survey Functions 

  const postNewSurvey = async (surveyData) => {
    const newSurvey = await postSurvey(surveyData)
    setUserSurveys(prevState => [...prevState, newSurvey])
    return newSurvey
  }

  const handleSurveyEdit = async (id, surveyData) => {
    const updatedSurvey = await putSurvey(id, surveyData);
    // setUserSurveys(prevState => prevState.map(survey => {
    //   return survey.id === Number(id) ? updatedSurvey : survey
    // }))
    // return updatedSurvey
  }

  // Answer Functions


  const handleSubmit = async (survey, surveyAnswers) => {
      console.log(survey)
    setSubmitAnswers(!submitAnswers)
      console.log(surveyAnswers)
    await handlePost(survey, surveyAnswers)
  }

  const handlePost = async (survey, surveyAnswers) => {
      console.log(surveyAnswers)
    const newSurvey = await postNewSurvey(survey)
      console.log(newSurvey)
    const newSurveyID = newSurvey.id
      console.log(newSurveyID)
    setSurveyID(newSurveyID)
  }

  // UseEffects Below:

  // Grabs Survey-specific data including questions & options

  useEffect(() => {
    if (surveyFormat !== null) {
      console.log(surveyFormat)
      const getSurveyData = async () => {
        const rawSurveyData = await getOneSurveyFormat(surveyFormat.id);
        setSurveyData(rawSurveyData)
      }
      getSurveyData(surveyFormat.id);
    }
  }, [])

  useEffect(() => { 
    if (surveyID !== null) {
      Promise.all(surveyAnswers.map((pendingAnswer) => {
        pendingAnswer.survey_id = surveyID
        console.log(pendingAnswer)
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
      currentUser={currentUser}

      question={question}
      index={index}
      totalQuestions={surveyData.questions.length - 1}

      // Functions
      handleSubmit={handleSubmit}
      currentQuestion={currentQuestion}
      setCurrentQuestion={setCurrentQuestion}
      submitAnswers={submitAnswers}

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

        <div className="demographics-questionnaire-container">
      
          {surveyQuestions}

        </div>

      }

    </>
  )
}