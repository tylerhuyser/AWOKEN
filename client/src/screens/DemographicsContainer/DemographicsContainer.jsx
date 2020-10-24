import React, {useState} from 'react'

import Question from '../../components/Question/Question';

export default function DemographicsContainer(props) {

  const [currentQuestion, setCurrentQuestion] = useState(0)
  
  const [demographicsSurvey, setDemographicsSurvey] = useState({
    survey_format: 1
  })

  const { demographicsQuestionData, postDemographicAnswer, postDemographicsSurvey } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDemographicsSurvey(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  console.log(props)
  console.log(demographicsQuestionData)
  console.log(demographicsQuestionData.questions)

  const demographicsQuestions = demographicsQuestionData.questions && demographicsQuestionData.questions.map((question, index) => (
    <Question
    
      // Data
      question={question}
      index={index}
      totalQuestions={demographicsQuestionData.questions.length - 1}
      currentQuestion={currentQuestion}
      setCurrentQuestion={setCurrentQuestion}

      // Functions
      postDemographicAnswer={postDemographicAnswer}
      postDemographicsSurvey={postDemographicsSurvey}

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