import React, { useState } from 'react';
import Option from '../Option/Option.jsx'

import './Question.css'

export default function Questions(props) {

  const currentUser = props.currentUser
  const question_format = props.question.question_format

  const [answerData, setAnswerData] = useState({
    employee_id: currentUser,
    survey_id: [],
    question_id: props.question.id,
    option_id: [],
    free_response: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswerData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  
  console.log(props)
  
  const optionData = props.question.options.map((option, index) => (
    <Option
      
      option={option}
      index={index}
      answerData={answerData}
      setAnswerData={setAnswerData}

      question_format={question_format}
  
    />
  ))


  return (
    <div className="question-container">
      <p className={`question-${props.question.id}`}>{props.question.question_copy}</p>
        {optionData}
    </div>
  )
}