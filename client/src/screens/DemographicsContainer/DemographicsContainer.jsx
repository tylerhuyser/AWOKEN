import React, {useState} from 'react'

import Question from '../../components/Question/Question';

export default function DemographicsContainer(props) {
  
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
    
      question={question}
      postDemographicAnswer={postDemographicAnswer}
      postDemographicsSurvey={postDemographicsSurvey}
      demographicsSurvey={demographicsSurvey}
      index={index}
    
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