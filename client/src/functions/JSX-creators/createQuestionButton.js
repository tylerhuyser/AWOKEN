import React from 'react'
import changeQuestion from "../../functions/changeQuestion"
import submitSurvey from '../switch-handler-functions/submitSurvey';

export default function createQuestionButton(index, totalQuestions, currentQuestion, setCurrentQuestion, submitAnswers, setSubmitAnswers, setSurveyAnswers, history) {
  if (index === totalQuestions) {

    return (
      <button className="question-button" onClick={(e) => {
        e.preventDefault();
        submitSurvey(submitAnswers, setSubmitAnswers, setSurveyAnswers);
      }}>SUBMIT</button>
    )
  } else {

    return (
      <button className="question-button" onClick={() => changeQuestion(1, totalQuestions, currentQuestion, setCurrentQuestion, history)}>CONTINUE</button>
    )
  }
}