import React from 'react'
import { putSurvey, destroySurvey } from '../../services/surveys';
import { putAnswer, destroyAnswer } from '../../services/answers';


export default function Journals(props) {

  const { userSurveys } = props;

  console.log(userSurveys)

  const journals = userSurveys.map((journal, index) => {

    if (journal.survey_format_id === 13) {
      return (
        <div className="journal-card">

          <p clasName="journal-title">{`Journal ${journal.iteration}`}</p>

          <div className="journal-buttons-container">

            <button className="journal-button" id="journal-edit-button">EDIT</button>
            <button className="journal-button" id="journal-delete-button">DELETE</button>

          </div>

        </div>
      )
    }
  })
  
  return (
    
    <>
      
      {
        userSurveys ?
          
          <div className = "journals-container">

            { journals }
      
          </div>

      :
  
        null
      }

    </>
  )
}