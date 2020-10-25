import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Question from '../../components/Question/Question';

export default function DemographicsContainer(props) {

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const { demographicsQuestionData, postSurveyAndAnswers, currentUser } = props;
  const [submitAnswers, setSubmitAnswers] = useState(false)
  const history = useHistory();
  
  const [demographicsSurvey, setDemographicsSurvey] = useState({
    survey_format: 1
  })

  const [surveyAnswers, setSurveyAnswers] = useState([])

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setDemographicsSurvey(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }))
  // }

  useEffect((demographicsSurvey, surveyAnswers) => {
    const handlePost = async (demographicsSurvey, surveyAnswers) => {
      await postSurveyAndAnswers(demographicsSurvey,surveyAnswers)
      history.push('/')
    }
  }, [surveyAnswers])

  const handleSubmit = () => {
    setSubmitAnswers(!submitAnswers)
  }


  const demographicsQuestions = demographicsQuestionData.questions && demographicsQuestionData.questions.map((question, index) => (
    <Question
    
      // Data
      currentUser={currentUser}
      question={question}
      index={index}
      totalQuestions={demographicsQuestionData.questions.length - 1}
      currentQuestion={currentQuestion}
      setCurrentQuestion={setCurrentQuestion}
      surveyAnswers={surveyAnswers}
      setSurveyAnswers={setSurveyAnswers}
      submitAnswers={submitAnswers}
      setSubmitAnswers={setSubmitAnswers}

      // Functions
      handleSubmit={handleSubmit}

      // Forms
      demographicsSurvey={demographicsSurvey}
    
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