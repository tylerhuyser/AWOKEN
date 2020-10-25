import React, { useEffect, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import Question from '../../components/Question/Question';
import { postAnswer } from '../../services/answers';

export default function DemographicsContainer(props) {

  const [surveyID, setSurveyID] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const { demographicsQuestionData, postNewSurvey, currentUser } = props;
  const [submitAnswers, setSubmitAnswers] = useState(false)
  const history = useHistory();
  
  const [demographicsSurvey, setDemographicsSurvey] = useState({
    survey_format_id: 1,
  })

  const [surveyAnswers, setSurveyAnswers] = useState([])

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setDemographicsSurvey(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }))
  // }



  const handleSubmit = async (demographicsSurvey, surveyAnswers) => {
    console.log(demographicsSurvey)
    setSubmitAnswers(!submitAnswers)
    console.log(surveyAnswers)
    await handlePost(demographicsSurvey, surveyAnswers)
  }

  const handlePost = async (demographicsSurvey, surveyAnswers) => {
    console.log(surveyAnswers)
    const newSurveyData = await postNewSurvey(demographicsSurvey)
    // history.push('/')
    console.log(newSurveyData)
    const surveyID = newSurveyData.id
    setSurveyID(surveyID)
  }

  useCallback(() => {
    surveyAnswers.map((pendingAnswer) => {
      pendingAnswer.survey_id = surveyID
      console.log(pendingAnswer)
      const postAnswers = async (pendingAnswer) => {
        const newAnswer = await postAnswer('/answers', { answer: pendingAnswer });
        return newAnswer
      }
      postAnswers(pendingAnswer)
    })

  }, [surveyID])
  



  const demographicsQuestions = demographicsQuestionData.questions && demographicsQuestionData.questions.map((question, index) => (
    <Question
    
      // Data
      currentUser={currentUser}
      question={question}
      index={index}
      totalQuestions={demographicsQuestionData.questions.length - 1}
      currentQuestion={currentQuestion}
      setCurrentQuestion={setCurrentQuestion}
      submitAnswers={submitAnswers}
      setSubmitAnswers={setSubmitAnswers}

      // Functions
      handleSubmit={handleSubmit}

      // Forms
      demographicsSurvey={demographicsSurvey}
      surveyAnswers={surveyAnswers}
      setSurveyAnswers={setSurveyAnswers}
    
    />
  ))

  return (

    <>
      
      { demographicsQuestionData === undefined ?
      

        <div className="loader"></div>
        
        :

        <div className="demographics-questionnaire-container">
      
          {demographicsQuestions}

        </div>

      }

    </>
  )
}