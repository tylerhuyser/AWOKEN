import React, {useState, useEffect} from 'react';

import routeOptionCreate from '../../functions/routeOptionCreate.js';
// import routeAnswerChange from '../../functions/routeAnswerChange.js';

import './Option.css'

export default function Option(props) {
  
  const { currentUser, question, option, submitAnswers } = props
  const { setSurveyAnswers } = props
  const { answerData, setAnswerData } = props
  const { selectAllArray, setSelectAllArray } = props

  const [selectAllAnswerData, setSelectAllAnswerData] = useState({
    employee_id: currentUser.id,
    survey_id: [],
    question_id: question.id,
    option_id: [],
    free_response: ""
  });

  useEffect(() => {
    if ((selectAllAnswerData.option_id.length !== 0) || (selectAllAnswerData.free_response !== "")) {
      setSurveyAnswers(prevState => ([...prevState, selectAllAnswerData]));
    }
  }, [submitAnswers])

  const optionJSX = routeOptionCreate(question, option, answerData, setAnswerData, selectAllArray, setSelectAllArray, setSelectAllAnswerData)

  return(

    <div className="option-container" key={`${option.id}`}>

      {optionJSX}

    </div>

  )
}