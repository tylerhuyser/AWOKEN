import React, {useState, useEffect} from 'react';

import routeOptionCreate from '../../functions/routeOptionCreate.js';

import './Option.css'

export default function Option(props) {
  
  const { currentUser, question, option, completeSurveySwitch } = props
  const { setCompletedSurveyAnswers } = props
  const { answerData, setAnswerData } = props
  const { editAnswer } = props
  const { selectAllArray, setSelectAllArray } = props
  const { selfDescribeVisibilitySwitch, setSelfDescribeVisibilitySwitch } = props

  const [selectAllAnswerData, setSelectAllAnswerData] = useState({
    employee_id: currentUser.id,
    survey_id: [],
    question_id: question.id,
    option_id: [],
    free_response: ""
  });

  useEffect(() => {
    if ((selectAllAnswerData.option_id.length !== 0) || (selectAllAnswerData.free_response !== "")) {
      setCompletedSurveyAnswers(prevState => ([...prevState, selectAllAnswerData]));
    }
  }, [completeSurveySwitch])

  console.log('OPTION Mount')

  const optionJSX = routeOptionCreate(question, option, answerData, setAnswerData, selectAllArray, setSelectAllArray, selectAllAnswerData, setSelectAllAnswerData, selfDescribeVisibilitySwitch, setSelfDescribeVisibilitySwitch, editAnswer)

  return(

    <>

      {optionJSX}

    </>

  )
}