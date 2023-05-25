import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { getOneEmployee } from '../../services/admin-info';

import editSurvey from "../../functions/switch-handler-functions/editSurvey"
import handleDelete from "../../functions/CRUD/DELETE/handleDeleteSurvey.js"

import './Journals.css'

export default function Journals(props) {

  const { currentUser } = props;
  const { completedSurveys, setCompletedSurveys } = props
  const { isDeleted, setIsDeleted } = props

  // Location
  const history = useHistory();

  useEffect(() => {
      const getEmployeeSurveys = async (userID) => {
        const employee = await getOneEmployee(userID);
        const employeeSurveys = employee.surveys
        setCompletedSurveys(employeeSurveys);
      }
      getEmployeeSurveys(currentUser.id)
  }, [isDeleted])


  const journals = completedSurveys?.filter((journal) => journal.survey_format_id === 13).map((journal, index) => {

      return (

          <div className="journal-card" key={`${ index }-journal-card`}>

            <p className="journal-title" key={`${index}-journal-title`}>{`Journal ${journal.iteration}`}</p>

            <div className="journal-buttons-container" key={`${ index }-journal-buttons-container`}>

              <button className="journal-button" id="journal-edit-button" key={`${ index }-journal-edit-button`} onClick={() => editSurvey(journal.id, history)}>EDIT</button>
              <button className="journal-button" id="journal-delete-button" key={`${ index }-journal-delete-button`} onClick={() => handleDelete(journal.id, isDeleted, setIsDeleted)}>DELETE</button>

            </div>

          </div>

      )
    })

  
  return (
    
    <>
      
      {
        completedSurveys ?

        <>
          
            {journals.length === 0 || journals[0] === undefined ?
            
              <div className="journals-container">

                <p className="no-surveys-message">Sorry, but you have not completed any journals.</p>
      
              </div>
            
              :
          
              <div className="journals-container">

                {journals}
      
              </div>
            
            }
            
        </>

      :
  
        null
        
      }

    </>
  )
}