import React from 'react'

export default function createSurveyProgressMarkers(index, totalQuestions) {
  let surveyProgressMarkers = []
  for (let i = 0; i <= totalQuestions; i++) {
    if (i === index) {
      surveyProgressMarkers[i] = React.createElement("span", { className: "survey-progress-marker active-progress-marker", key: `Question ${i}` })
    } else {
      surveyProgressMarkers[i] = React.createElement("span", { className: "survey-progress-marker inactive-progress-marker", key: `Question: ${i}` })
    }
  }
  return surveyProgressMarkers
}