import React, { useState, useEffect } from 'react';
import './App.css';
import Layout from './layout/Layout/Layout.jsx';
import Login from './screens/Login/Login';
import Register from "./screens/Register/Register";
import { loginEmployee, registerEmployee, removeToken, verifyEmployee } from './services/auth';
import { getAllCompanies } from './services/admin-info';

import { Route, useHistory, Switch } from 'react-router-dom';
import MainContainer from './containers/MainContainer';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [companyInfo, setCompanyInfo] = useState([]);
  const history = useHistory();

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

        <Layout 
          currentUser={currentUser}
          handleLogout={handleLogout}
        >
          <MainContainer />
        </Layout>
      }
    </div>
  );
}

export default App;
