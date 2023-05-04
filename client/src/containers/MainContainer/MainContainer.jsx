import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from '../../screens/Home/Home'
import Journals from "../../screens/Journals/Journals"
import { destroySurvey } from '../../services/surveys';

import "./MainContainer.css"


export default function MainContainer(props) {

  const [ isDeleted, setIsDeleted ] = useState(false)
  const { currentUser, setPendingSurvey } = props
  const { completedSurveys, setCompletedSurveys } = props
  const { setActiveSurveyID, setEditSurvey } = props
 
  const deleteJournal = async (id) => {
    await destroySurvey(id)
    setIsDeleted(!isDeleted)
  }


  return (
  <div className="main-container">
      
      <Switch>

        <Route exact path="/home">
          <Home setPendingSurvey={setPendingSurvey}/>
        </Route>

        <Route exact path="/journals">
          <Journals
            currentUser={currentUser}
            completedSurveys={completedSurveys} setCompletedSurveys={setCompletedSurveys}
            isDeleted={isDeleted} setIsDeleted={setIsDeleted}
            deleteJournal={deleteJournal}
            setActiveSurveyID={setActiveSurveyID}
            setEditSurvey={setEditSurvey} />
        </Route>

      </Switch>

  </div>
  )
}
