import React, { useState, useEffect } from 'react'
// import { getAllFlavors } from '../services/flavors';
// import { getAllFoods, postFood, putFood } from '../services/foods';
import { Route, Switch, useHistory } from 'react-router-dom';
import DemographicsContainer from '../screens/DemographicsContainer/DemographicsContainer'
import { getAllSurveyFormats, getOneSurveyFormat } from '../services/survey-constructors.js'
import { postSurvey } from '../services/surveys';
import { postAnswer } from '../services/answers.js';

import "./MainContainer.css"


export default function MainContainer(props) {
  const [surveyFormats, setSurveyFormats] = useState([])
  const [demographicsQuestionData, setDemographicsQuestionData] = useState([])
  const {currentUser} = props
  const history = useHistory();

  useEffect(() => {
    const getAllSurveyFormatData = async () => {
      const surveyFormatData = await getAllSurveyFormats();
      setSurveyFormats(surveyFormatData);
    }
    getAllSurveyFormatData();
  }, [])

  useEffect(() => {
    const getDemographicsSurvey = async () => {
      const demographicSurveyData = await getOneSurveyFormat(1);
      setDemographicsQuestionData(demographicSurveyData)
    }
    getDemographicsSurvey();
  }, [])

  const postDemographicAnswer = async (demographicAnswerData) => {
    await postAnswer('/answers', { answer: demographicAnswerData });
  }

  const postDemographicsSurvey = async (demographicsData) => {
    await postSurvey(demographicsData);
    history.push('/')
  }

  console.log(demographicsQuestionData)
  console.log(currentUser)



  return (
  <div className="main-container">
      
      <Switch>

        <Route path="/complete-profile">
          <DemographicsContainer currentUser={currentUser} demographicsQuestionData={demographicsQuestionData} postDemographicAnswer={postDemographicAnswer} postDemographicsSurvey={postDemographicsSurvey} />
        </Route>

      </Switch>

  </div>
  )
}
