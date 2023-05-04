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

// Functions
import handleVerify from "./functions/handleVerify";
import { getAllCompanies, getOneEmployee } from "./services/admin-info";
import { getAllSurveyFormats } from "./services/survey-constructors.js";

function App() {
  // Auth
  const [currentUser, setCurrentUser] = useState(null);

// User Data
  const [userSurveys, setUserSurveys] = useState(null);

  // App Data
  const [companyInfo, setCompanyInfo] = useState([]);
  const [surveyFormats, setSurveyFormats] = useState([]);

  // Switches
  const [pendingSurvey, setPendingSurvey] = useState(false);
  const [editSurvey, setEditSurvey] = useState(false);
  const [activeSurveyID, setActiveSurveyID] = useState(0);

  // Location
  const history = useHistory();

  // Survey_Formats:
  const demographicsSurvey = surveyFormats[0];
  const IMS = surveyFormats[1];
  const EMS = surveyFormats[2];
  const MP = surveyFormats[3];
  const IAT = surveyFormats[4];
  const shouldsWoulds = surveyFormats[5];
  const modernRacism2000 = surveyFormats[6];
  const subtleBlatant = surveyFormats[7];
  const organizationalInclusivityAudit = surveyFormats[8];
  const concern = surveyFormats[9];
  const priming = surveyFormats[10];
  const srQuestionnaire = surveyFormats[11];
  const srJournal = surveyFormats[12];

// UseEffects

  useEffect(() => {
    console.log('App.js - UseEffect #1 - Verify')
    handleVerify(history, setCurrentUser);
  }, []);

  // Register - Generates Company List (Dropdown)
  useEffect(() => {

    console.log('App.js - UseEffect #2 - Generate Company List')

    const generateCompanyList = async () => {
      const companyInfo = await getAllCompanies();
      setCompanyInfo(companyInfo);
    };

    generateCompanyList();

  }, []);

  // Survey Foramts - Gathers All Survey_Format IDs
  useEffect(() => {

    if (currentUser !== null) {

      console.log('App.js - UseEffect #3 - Get All Survey Data')

      const getAllSurveyFormatData = async () => {
        const surveyFormatData = await getAllSurveyFormats();
        setSurveyFormats(surveyFormatData);
      };

      getAllSurveyFormatData();

    }

  }, [currentUser]);

  // Demographics Redirect - Redirects to Complete Profile
  useEffect(() => {

    if (currentUser !== null) {

      console.log('App.js - UseEffect #4 - Gathers Current User (Employee) Surveys')

      const userID = currentUser.id;

      const getEmployeeSurveys = async (userID) => {
        const employee = await getOneEmployee(userID);
        const employeeSurveys = employee.surveys;
        setUserSurveys(employeeSurveys);
        if (employeeSurveys === null || employeeSurveys.length === 0) {
          history.push("/complete-profile");
        }
      };

      getEmployeeSurveys(userID);

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
            setUserSurveys={setUserSurveys}
            setPendingSurvey={setPendingSurvey}
          />
        </Route>

        <Route path="/new-journal">
          <SurveyContainer
            currentUser={currentUser}
            surveyFormat={srJournal}
            setUserSurveys={setUserSurveys}
            setPendingSurvey={setPendingSurvey}
          />
        </Route>

        <Route path="/edit-journal">
          <EditContainer
            currentUser={currentUser}
            surveyFormat={srJournal}
            setUserSurveys={setUserSurveys}
            setPendingSurvey={setPendingSurvey}
            activeSurveyID={activeSurveyID}
          />
        </Route>

        <Layout currentUser={currentUser} setCurrentUser={setCurrentUser}>
          <MainContainer
            currentUser={currentUser}
            srQuestionnaire={srQuestionnaire}
            srJournal={srJournal}
            setPendingSurvey={setPendingSurvey}
            userSurveys={userSurveys}
            setUserSurveys={setUserSurveys}
            setActiveSurveyID={setActiveSurveyID}
            setEditSurvey={setEditSurvey}
          />
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
          {(pendingSurvey) || (editSurvey) || (userSurveys && userSurveys.length === 0) ? (
            <Switch>
              <Route path="/complete-profile">
                <SurveyContainer
                  currentUser={currentUser}
                  surveyFormat={demographicsSurvey}
                  setUserSurveys={setUserSurveys}
                  setPendingSurvey={setPendingSurvey}
                />
              </Route>

              <Route path="/new-journal">
                <SurveyContainer
                  currentUser={currentUser}
                  surveyFormat={srJournal}
                  setUserSurveys={setUserSurveys}
                  setPendingSurvey={setPendingSurvey}
                />
              </Route>

              <Route path="/edit-journal">
                <EditContainer
                  currentUser={currentUser}
                  surveyFormat={srJournal}
                  setUserSurveys={setUserSurveys}
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
                userSurveys={userSurveys}
                setUserSurveys={setUserSurveys}
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
