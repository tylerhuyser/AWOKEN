import React, { useState } from 'react';
import Option from '../Option/Option.jsx'

import './Question.css'

export default function Questions(props) {

  const [answerData, setAnswerData] = useState({});
  
  console.log(props)
  
  // const optionData = props.options.map((option, index) => (
  //   <Option
    
      
    
  //   />
  // ))


  return (
    <div className="question-container">
      <p className={`question-${props.question.id}`}>{props.question.question_copy}</p>
    </div>
  )
}