import React, { useState, useEffect } from "react";
import { Route, useHistory, Switch } from "react-router-dom";

import "./App.css";

// Components
import Layout from "./layout/Layout/Layout.jsx";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import MainContainer from "./containers/MainContainer/MainContainer";
import SurveyContainer from "./containers/SurveyContainer/SurveyContainer";
import EditContainer from "./containers/EditContainer/EditContainer";

// Functions
import {
  loginEmployee,
  registerEmployee,
  removeToken,
  verifyEmployee,
} from "./services/auth";
import { getAllCompanies, getOneEmployee } from "./services/admin-info";
import { getAllSurveyFormats } from "./services/survey-constructors.js";

function App() {
  // Auth
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("")

// User Data
  const [userSurveys, setUserSurveys] = useState(null);
  const [pendingSurvey, setPendingSurvey] = useState(false);
  const [editSurvey, setEditSurvey] = useState(false);
  const [activeSurveyID, setActiveSurveyID] = useState(0);

  // App Data
  const [companyInfo, setCompanyInfo] = useState([]);
  const [surveyFormats, setSurveyFormats] = useState([]);

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

  // Login - Verifies User
  useEffect(() => {
    const handleVerify = async () => {
      const userData = await verifyEmployee();
      setCurrentUser(userData);
      if (userData === null) {
        history.push("/login");
      }
    };
    handleVerify();
  }, []);

  // Register - Generates Company List (Dropdown)
  useEffect(() => {
    const generateCompanyList = async () => {
      const companyInfo = await getAllCompanies();
      setCompanyInfo(companyInfo);
    };
    generateCompanyList();
  }, []);

  // Survey Foramts - Gathers All Survey_Format IDs
  useEffect(() => {
    const getAllSurveyFormatData = async () => {
      const surveyFormatData = await getAllSurveyFormats();
      setSurveyFormats(surveyFormatData);
    };
    getAllSurveyFormatData();
  }, []);

  // Demographics Redirect - Redirects to Complete Profile
  useEffect(() => {
    if (currentUser !== null) {
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

  // Functions

  // Login Functions

  const handleLogin = async (loginData) => {
    const employeeData = await loginEmployee(loginData);
    if (employeeData.error) {
      setError(employeeData.error)
    } else {
      setCurrentUser(employeeData);
      history.push("/home");
    }
  };

  const handleRegister = async (registerData) => {
    const employeeData = await registerEmployee(registerData);
    if (employeeData.error) {
      setError(employeeData.error)
    } else {
      setCurrentUser(employeeData);
      setPendingSurvey(true);
      history.push("/complete-profile");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("authToken");
    removeToken();
    history.push("/login");
  };

  useEffect(() => {
    if (editSurvey) {
      history.push("/edit-journal")
    }
  }, [editSurvey])

  return (
    <div className="app-container">
      
      {!currentUser ? (
        <Switch>
          <Route path="/login">
            <Login handleLogin={handleLogin} />
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
              />
            </Layout>
          )}
        </>
      )}
    </div>
  );
}

export default App;
