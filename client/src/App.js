import React, { useState, useEffect } from 'react';
import { Route, useHistory, useLocation, Switch } from 'react-router-dom';

import './App.css';

// Components
import Layout from './layout/Layout/Layout.jsx';
import Login from './screens/Login/Login';
import Register from "./screens/Register/Register";
import MainContainer from './containers/MainContainer';
import SurveyContainer from './screens/SurveyContainer/SurveyContainer';

// Functions
import { loginEmployee, registerEmployee, removeToken, verifyEmployee } from './services/auth';
import { getAllCompanies } from './services/admin-info';
import { getAllSurveyFormats } from './services/survey-constructors.js'


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [companyInfo, setCompanyInfo] = useState([]);
  const [surveyFormats, setSurveyFormats] = useState([])
  const history = useHistory();
  const location = useLocation();

  console.log(currentUser)
  console.log(surveyFormats)

  const demographicsSurvey = surveyFormats[0]

  // UseEffects

  useEffect(() => {
    const handleVerify = async () => {
      const userData = await verifyEmployee();
      setCurrentUser(userData)
    }
      handleVerify();
  }, [])

  useEffect(() => {
      const generateCompanyList = async () => {
        const companyInfo = await getAllCompanies();
        setCompanyInfo(companyInfo)
      }
      generateCompanyList();
  }, [])

  useEffect(() => {
    const getAllSurveyFormatData = async () => {
      const surveyFormatData = await getAllSurveyFormats();
      setSurveyFormats(surveyFormatData);
    }
    getAllSurveyFormatData();
  }, [])

  // useEffect(() => {
  //   const getDemographicsSurvey = async () => {
  //     const demographicSurveyData = await getOneSurveyFormat(1);
  //     setDemographicsQuestionData(demographicSurveyData)
  //   }
  //   getDemographicsSurvey();
  // }, [])

  // Login Functions

  const handleLogin = async (loginData) => {
    const employeeData = await loginEmployee(loginData);
    setCurrentUser(employeeData);
    history.push('/');
  }

  const handleRegister = async (registerData) => {
    const employeeData = await registerEmployee(registerData);
    setCurrentUser(employeeData);
    history.push('/complete-profile')
  }

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('authToken');
    removeToken();
    history.push('/login')
  }

  // Survey Functions


  return (

    <div className="app-container">

      { !currentUser ?
      
        <Switch>

          <Route path="/login">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path="/register">
            <Register handleRegister={handleRegister} companyInfo={companyInfo} />
          </Route>

        </Switch>

        :

        <>
      
        { currentUser.surveys === undefined ?
        
          <Switch>
            <Route path="/complete-profile">
              <SurveyContainer currentUser={currentUser} surveyFormat={demographicsSurvey} />
            </Route>
          </Switch>
          
        :

        <Layout
          currentUser={currentUser}
          handleLogout={handleLogout}
          >
            <MainContainer currentUser={currentUser} />
          </Layout>
          }
          
        </>
      }
    </div>
  );
}

export default App;
