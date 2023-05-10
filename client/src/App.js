import React, { useState, useEffect } from "react";
import { Route, useHistory, Switch } from "react-router-dom";

import "./App.css";

// Components
import Layout from "./layout/Layout/Layout.jsx";
import LandingPage from "./screens/LandingPage/LandingPage"
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import MainContainer from "./containers/MainContainer/MainContainer";
import SurveyContainer from "./containers/SurveyContainer/SurveyContainer";
import EditContainer from "./containers/EditContainer/EditContainer";

import Home from "./screens/Home/Home"
import Journals from "./screens/Journals/Journals"

// Functions
import handleVerify from "./functions/auth/handleVerify";
import gatherCompanies from "./functions/gatherCompanies";
import gatherSurveyFormats from './functions/gatherSurveyFormats'
import gatherCompletedSurveys from "./functions/gatherCompletedSurveys"

function App() {
  // Auth
  const [currentUser, setCurrentUser] = useState(null);

// User Data
  const [completedSurveys, setCompletedSurveys] = useState(null);

  // App Data
  const [companyInfo, setCompanyInfo] = useState([]);
  const [surveyFormats, setSurveyFormats] = useState([]);

  // Switches
  const [pendingSurvey, setPendingSurvey] = useState(false);
  const [editSurvey, setEditSurvey] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false)
  const [activeSurveyID, setActiveSurveyID] = useState(0);

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

  useEffect(() => {
    console.log('App.js - UseEffect #5 - EditSurvey Pushes user to Edit-Journal')
    if (editSurvey) {
      history.push("/edit-journal")
    }
  }, [editSurvey])

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
            setPendingSurvey={setPendingSurvey}
          />
        </Route>
          
        <Route path="/complete-profile">
          <SurveyContainer
            currentUser={currentUser}
            surveyFormat={demographicsSurvey}
            setCompletedSurveys={setCompletedSurveys}
            setPendingSurvey={setPendingSurvey}
          />
          </Route>

        <Route path="/new-journal">
          <SurveyContainer
            currentUser={currentUser}
            surveyFormat={srJournal}
            setCompletedSurveys={setCompletedSurveys}
            setPendingSurvey={setPendingSurvey}
          />
        </Route>

        <Route path="/edit-journal">
          <EditContainer
            currentUser={currentUser}
            surveyFormat={srJournal}
            setCompletedSurveys={setCompletedSurveys}
            setPendingSurvey={setPendingSurvey}
            activeSurveyID={activeSurveyID}
          />
        </Route>

          
        <Layout currentUser={currentUser} setCurrentUser={setCurrentUser}>

          <Route exact path="/home">
              <Home setPendingSurvey={setPendingSurvey} />
          </Route>

          <Route exact path="/journals">
            <Journals
              currentUser={currentUser}
              completedSurveys={completedSurveys} setCompletedSurveys={setCompletedSurveys}
              isDeleted={isDeleted} setIsDeleted={setIsDeleted}
              setActiveSurveyID={setActiveSurveyID}
              setEditSurvey={setEditSurvey} />
          </Route>
          
        </Layout> 
          
      </Switch>


      
      {/* {!currentUser ? (
        <Switch>
          <Route path="/login">
            <Login
              handleLogin={handleLogin}
              error=
              {error} />
          </Route>

          <Route path="/register">
            <Register
              handleRegister={handleRegister}
              companyInfo={companyInfo}
            />
          </Route>
        </Switch>
      ) : (
        <>
          {(pendingSurvey) || (editSurvey) || (completedSurveys && completedSurveys.length === 0) ? (
            <Switch>
              <Route path="/complete-profile">
                <SurveyContainer
                  currentUser={currentUser}
                  surveyFormat={demographicsSurvey}
                  setCompletedSurveys={setCompletedSurveys}
                  setPendingSurvey={setPendingSurvey}
                />
              </Route>

              <Route path="/new-journal">
                <SurveyContainer
                  currentUser={currentUser}
                  surveyFormat={srJournal}
                  setCompletedSurveys={setCompletedSurveys}
                  setPendingSurvey={setPendingSurvey}
                />
              </Route>

              <Route path="/edit-journal">
                <EditContainer
                  currentUser={currentUser}
                  surveyFormat={srJournal}
                  setCompletedSurveys={setCompletedSurveys}
                  setPendingSurvey={setPendingSurvey}
                  activeSurveyID={activeSurveyID}
                />
              </Route>
            </Switch>
          ) : (
            <Layout currentUser={currentUser} handleLogout={handleLogout}>
              <MainContainer
                currentUser={currentUser}
                srQuestionnaire={srQuestionnaire}
                srJournal={srJournal}
                setPendingSurvey={setPendingSurvey}
                completedSurveys={completedSurveys}
                setCompletedSurveys={setCompletedSurveys}
                setActiveSurveyID={setActiveSurveyID}
                setEditSurvey={setEditSurvey}
              />
            </Layout>
          )}
        </>
      )} */}


    </div>
  );
}

export default App;
