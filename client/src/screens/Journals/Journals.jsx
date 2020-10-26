import React, {useState, useEffect } from 'react'
import { putSurvey, destroySurvey } from '../../services/surveys';
import { putAnswer, destroyAnswer } from '../../services/answers';
import { getOneEmployee } from '../../services/admin-info';

import './Journals.css'

export default function Journals(props) {

  const { currentUser, deleteJournal } = props;
  const { userSurveys, setUserSurveys } = props
  const { isDeleted } = props

  useEffect(() => {
      const userID = currentUser.id
      const getEmployeeSurveys = async (userID) => {
        const employee = await getOneEmployee(userID);
        const employeeSurveys = employee.surveys
        setUserSurveys(employeeSurveys);
      }
      getEmployeeSurveys(userID)
  }, [isDeleted])

  console.log(userSurveys)

  const journals = userSurveys?.map((journal, index) => {

    if ((journal.survey_format_id === 13) && (index % 2 == 0)) {
      return (

        <div className="journal-card-container">

          <div className="journal-card-orange">

            <p className="journal-title">{`Journal ${journal.iteration}`}</p>

            {/* <p className="journal-date">{Date.parse(parseInt(journal.created_at.split("").splice(10).join("")))}</p> */}

            <div className="journal-buttons-container">

              <button className="journal-button" id="journal-edit-button">EDIT</button>
              <button className="journal-button" id="journal-delete-button" onClick={() => deleteJournal(journal.id)}>DELETE</button>

            </div>

          </div>
          
        </div>

      )
    } else if (journal.survey_format_id === 13) {
      return (

        <div className="journal-card-container">

          <div className="journal-card-purple">

            <p className="journal-title">{`Journal ${journal.iteration}`}</p>

            <div className="journal-buttons-container">

              <button className="journal-button" id="journal-edit-button">EDIT</button>
              <button className="journal-button" id="journal-delete-button" onClick={() => deleteJournal(journal.id)}>DELETE</button>

            </div>

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