import React from 'react'
import { useHistory } from 'react-router-dom';

import './Home.css'


export default function Home(props) {
  
  const { setPendingSurvey } = props;
  const history = useHistory();

  function beginJournal(e) {
    e.preventDefault();
    setPendingSurvey(true)
    history.push('/new-journal')
  }

  return (
    <div className="home-container">
      
      <div className="home-card">

        <p className="home-card-title">NOTIFICATIONS</p>

        <div className="home-card-content" id="notifications">
          <p className="home-card-copy">Let's get started!</p>
          <p className="home-card-copy">Complete Your Onboarding Assement</p>
          <button className="home-journal-button" onClick={beginJournal}>BEGIN</button>
        </div>

      <div className="home-card">

      <p className="home-card-title">UPCOMING SCHEDULE</p>
          
          <div className="home-card-content" id="events">
            <div className="events-date">
              <p className="events-copy" id="event-date">21</p>
              <p className="events-copy" id="event-month">JUN</p>
            </div>
            
            <div className="events-info">
              <p className="events-copy" id="event-title">Lesson 1</p>
              <p className="events-copy" id="event-subtitle">An Introduction to Self-Regulation Strategies for Bias</p>
            </div>
        </div>
      </div>



      </div>



    </div>
  )
}