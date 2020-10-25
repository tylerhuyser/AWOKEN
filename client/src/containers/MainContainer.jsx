import React, { useState, useEffect } from 'react'
// import { getAllFlavors } from '../services/flavors';
// import { getAllFoods, postFood, putFood } from '../services/foods';
import { Route, Switch, useHistory } from 'react-router-dom';
import Home from '../screens/Home/Home'



import "./MainContainer.css"


export default function MainContainer(props) {
  const {currentUser} = props
  const history = useHistory();


  // const postSurveyAndAnswers = async (demographicsSurveyData, demographicAnswerData) => {
  //   const survey = await postDemographicsSurvey(demographicsSurveyData)



  // }

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
