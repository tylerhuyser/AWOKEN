import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from '../screens/Home/Home'
import Journals from "../screens/Journals/Journals"

import "./MainContainer.css"


export default function MainContainer(props) {
  // const {currentUser} = props
  // const history = useHistory();

  const { setPendingSurvey, userSurveys } = props


  return (
  <div className="main-container">
      
      <Switch>

        <Route exact path="/home">
          <Home setPendingSurvey={setPendingSurvey} />
        </Route>

        <Route exact path="/journals">
          <Journals userSurveys={userSurveys} />
        </Route>

      </Switch>

  </div>
  )
}
