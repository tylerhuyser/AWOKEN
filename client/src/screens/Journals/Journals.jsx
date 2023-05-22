import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { getOneEmployee } from '../../services/admin-info';

import handleEdit from "../../functions/switch-handler-functions/handleEdit"
import handleDelete from "../../functions/CRUD/DELETE/handleDeleteSurvey.js"

import './Journals.css'

export default function Journals(props) {

  const { currentUser } = props;
  const { completedSurveys, setCompletedSurveys } = props
  const { isDeleted, setIsDeleted } = props
  const { setEditSurveyID, setEditSurvey } = props

  // Location
  const history = useHistory();

  useEffect(() => {
      const userID = currentUser.id
      const getEmployeeSurveys = async (userID) => {
        const employee = await getOneEmployee(userID);
        const employeeSurveys = employee.surveys
        setCompletedSurveys(employeeSurveys);
      }
      getEmployeeSurveys(userID)
  }, [isDeleted])


  const journals = completedSurveys?.filter((journal) => journal.survey_format_id === 13).map((journal, index) => {

    if ((journal.survey_format_id === 13) && (index % 2 === 0)) {
      return (

        <div className="journal-card-container" key={`${ index }-journal-card-container`}>

          <div className="journal-card-orange" key={`${ index }-journal-card-orange`}>

            <p className="journal-title" key={`${index}-journal-title`}>{`Journal ${journal.iteration}`}</p>

            {/* <p className="journal-date">{Date.parse(parseInt(journal.created_at.split("").splice(10).join("")))}</p> */}

            <div className="journal-buttons-container" key={`${ index }-journal-buttons-container`}>

              <button className="journal-button" id="journal-edit-button" key={`${ index }-journal-edit-button`} onClick={() => handleEdit(journal.id, setEditSurveyID, setEditSurvey, history)}>EDIT</button>
              <button className="journal-button" id="journal-delete-button" key={`${ index }-journal-delete-button`} onClick={() => handleDelete(journal.id, isDeleted, setIsDeleted)}>DELETE</button>

            </div>

          </div>
          
        </div>

      )
    } else if (journal.survey_format_id === 13) {
      return (

        <div className="journal-card-container" key={`${ index }-journal-card-container`}>

          <div className="journal-card-purple" key={`${ index }-journal-card-purple`}>

            <p className="journal-title" key={`${index}-journal-title`}>{`Journal ${journal.iteration}`}</p>

            {/* <p className="journal-date">{Date.parse(parseInt(journal.created_at.split("").splice(10).join("")))}</p> */}

            <div className="journal-buttons-container" key={`${ index }-journal-buttons-container`}>

              <button className="journal-button" id="journal-edit-button" key={`${ index }-journal-edit-button`} onClick={() => handleEdit(journal.id)}>EDIT</button>
              <button className="journal-button" id="journal-delete-button" key={`${ index }-journal-delete-button`} onClick={() => handleDelete(journal.id, isDeleted, setIsDeleted)}>DELETE</button>

            </div>

          </div>
          
        </div>
      )
    }
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