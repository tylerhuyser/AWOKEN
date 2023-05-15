import React from 'react'

export default function createSurveyProgressMarkers(index, question, totalQuestions) {
  let surveyProgressMarkers = []
  for (let i = 0; i <= totalQuestions; i++) {
    if (i === index) {
      surveyProgressMarkers[i] = React.createElement("span", { className: "survey-progress-marker active", key: `${question.id}` })
    } else {
      surveyProgressMarkers[i] = React.createElement("span", { className: "survey-progress-marker inactive", key: `${question.id}` })
    }
  }
  return surveyProgressMarkers
}