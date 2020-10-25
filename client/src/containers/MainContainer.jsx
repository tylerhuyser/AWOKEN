import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from '../screens/Home/Home'

import "./MainContainer.css"


export default function MainContainer(props) {
  // const {currentUser} = props
  // const history = useHistory();


  return (
  <div className="main-container">
      
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>

  </div>
  )
}
