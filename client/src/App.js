import React, { useState, useEffect } from "react";
import { Route, useHistory, Switch } from "react-router-dom";

import "./App.css";

// Components
import Layout from "./layout/Layout/Layout.jsx";
import Loader from "./layout/Loader/Loader";
import LandingPage from "./screens/LandingPage/LandingPage"
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import SurveyContainer from "./containers/SurveyContainer/SurveyContainer";

import Home from "./screens/Home/Home"
import Journals from "./screens/Journals/Journals"

// Functions
import handleVerify from "./functions/auth/handleVerify";
import gatherCompanies from "./functions/CRUD/GET/gatherCompanies";
import gatherSurveyFormats from './functions/CRUD/GET/gatherSurveyFormats'
import gatherCompletedSurveys from "./functions/CRUD/GET/gatherCompletedSurveys"

function App() {
  // Auth
  const [currentUser, setCurrentUser] = useState(null);

  // User Data
  const [completedSurveys, setCompletedSurveys] = useState(null);

  // App Data
  const [companyInfo, setCompanyInfo] = useState([]);
  const [surveyFormats, setSurveyFormats] = useState([]);

  // Switches
  const [isDeleted, setIsDeleted] = useState(false)

  // Location
  const history = useHistory();

  // Survey_Formats:
  const demographicsSurvey = surveyFormats[0];
  // const IMS = surveyFormats[1];
  // const EMS = surveyFormats[2];
  // const MP = surveyFormats[3];
  // const IAT = surveyFormats[4];
  // const shouldsWoulds = surveyFormats[5];
  // const modernRacism2000 = surveyFormats[6];
  // const subtleBlatant = surveyFormats[7];
  // const organizationalInclusivityAudit = surveyFormats[8];
  // const concern = surveyFormats[9];
  // const priming = surveyFormats[10];
  // const srQuestionnaire = surveyFormats[11];
  const srJournal = surveyFormats[12];

  // UseEffects

  useEffect(() => {
    console.log('App.js - UseEffect #1 - Verify')
    handleVerify(history, setCurrentUser);
  }, []);

  // Register - Generates Company List (Dropdown)
  useEffect(() => {
    console.log('App.js - UseEffect #2 - Generate Company List')
    gatherCompanies(setCompanyInfo)
  }, []);

  // Survey Foramts - Gathers All Survey_Format IDs
  useEffect(() => {
    if (currentUser !== null) {
      console.log('App.js - UseEffect #3 - Get All Survey Data')
      gatherSurveyFormats(setSurveyFormats)
    }
  }, [currentUser]);

  // Demographics Redirect - Redirects to Complete Profile
  useEffect(() => {

    if (currentUser !== null) {
      console.log('App.js - UseEffect #4 - Gathers Current User (Employee) Surveys')
      gatherCompletedSurveys(currentUser.id, history, setCompletedSurveys)
    }
  }, [currentUser]);

  return (
      
    <div className="app-container">

        <Switch>

          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route path="/login">
            <Login
              setCurrentUser={setCurrentUser}
            />
          </Route>
              
          <Route path="/register">
            <Register
              companyInfo={companyInfo}
              setCurrentUser={setCurrentUser}
            />
          </Route>
              
          {currentUser && gatherCompanies && surveyFormats.length > 0 ?
          
            <>
          
              <Route path="/complete-profile">
                <SurveyContainer
                  currentUser={currentUser}
                  surveyFormat={demographicsSurvey}
                  setCompletedSurveys={setCompletedSurveys}
                />
              </Route>

              <Route path="/new-journal">
                <SurveyContainer
                  currentUser={currentUser}
                  surveyFormat={srJournal}
                  setCompletedSurveys={setCompletedSurveys}
                />
              </Route>

              <Route path="/edit-journal/:id">
                <SurveyContainer
                  currentUser={currentUser}
                  surveyFormat={srJournal}
                  setCompletedSurveys={setCompletedSurveys}
                />
              </Route>
              

              <Route exact path="/home">
                <Layout currentUser={currentUser} setCurrentUser={setCurrentUser}>
                  <Home />
                </Layout>
              </Route>

              <Route exact path="/journals">
                <Layout currentUser={currentUser} setCurrentUser={setCurrentUser}>
                  <Journals
                    currentUser={currentUser}
                    completedSurveys={completedSurveys} setCompletedSurveys={setCompletedSurveys}
                    isDeleted={isDeleted} setIsDeleted={setIsDeleted}
                />
                </Layout>
              </Route>  
      
            </>
              
          :
  
            <Loader />
          
          }
        
        </Switch>

      </div>
  );
}

export default App;
