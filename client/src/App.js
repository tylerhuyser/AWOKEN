import React, { useState, useEffect } from 'react';
import { Route, useHistory, useLocation, Switch } from 'react-router-dom';

import './App.css';

// Components
import Layout from './layout/Layout/Layout.jsx';
import Login from './screens/Login/Login';
import Register from "./screens/Register/Register";
import MainContainer from './containers/MainContainer';
import DemographicsContainer from './screens/DemographicsContainer/DemographicsContainer';

// Functions
import { loginEmployee, registerEmployee, removeToken, verifyEmployee } from './services/auth';
import { getAllCompanies } from './services/admin-info';
import { getAllSurveyFormats, getOneSurveyFormat } from './services/survey-constructors.js'
import { postSurvey } from './services/surveys';
import { postAnswer } from './services/answers.js';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [companyInfo, setCompanyInfo] = useState([]);
  const [surveyFormats, setSurveyFormats] = useState([])
  const [demographicsQuestionData, setDemographicsQuestionData] = useState([])
  const history = useHistory();
  const location = useLocation();

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

  useEffect(() => {
    const getDemographicsSurvey = async () => {
      const demographicSurveyData = await getOneSurveyFormat(1);
      setDemographicsQuestionData(demographicSurveyData)
    }
    getDemographicsSurvey();
  }, [])

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

  // Demographic Survey Functions

  const postDemographicAnswer = async (demographicAnswerData) => {
    await postAnswer('/answers', { answer: demographicAnswerData });
  }

  const postDemographicsSurvey = async (demographicsData) => {
    await postSurvey(demographicsData);
    history.push('/')
  }

  const postSurveyAndAnswers = async (surveyData, surveyAnswers) => {
    const survey = await postSurvey(surveyData)
    const surveyID = survey.data.id
    surveyAnswers.map((pendingAnswer) => {
      pendingAnswer.survey_id = surveyID
      const postAnswers = async (pendingAnswer) => {
        const newAnswer = await postAnswer('/answers', { answer: pendingAnswer });
        return newAnswer
      }
    })
  }


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
      
        { (location.pathname === '/complete-profile') ?
        
          <Switch>
            <Route path="/complete-profile">
              <DemographicsContainer currentUser={currentUser} demographicsQuestionData={demographicsQuestionData} postSurveyAndAnswers={postSurveyAndAnswers} />
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
