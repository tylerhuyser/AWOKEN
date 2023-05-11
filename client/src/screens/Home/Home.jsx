import React from 'react'
import { useHistory } from 'react-router-dom';

import beginJournal from "../../functions/beginJournal"

import './Home.css'


export default function Home(props) {
  
  const { setPendingSurvey } = props;
  const history = useHistory();

  return (
    <div className="home-container fade-in-home">
      
      <div className="home-card" id="notification-card">

        <p className="home-card-title">NOTIFICATIONS</p>

        <div className="home-card-content" id="notifications-content">
          <p className="home-card-copy">Let's get started!</p>
          <p className="home-card-copy">Complete Your Onboarding Assement</p>
          <button className="home-journal-button" id="notification-begin-journal-button" onClick={(e) => beginJournal(e, history, setPendingSurvey)}>BEGIN</button>
        </div>
      </div>

      <div className="home-card">

        <p className="home-card-title" id="calendar-card">UPCOMING SCHEDULE</p>
          
        <div className="home-card-content" id="event-content">
          <div className="event-info-container" id="event-date-container">
            <p className="event-copy" id="event-day">21</p>
            <p className="event-copy" id="event-month">JUN</p>
          </div>
            
          <div className="event-info-container" id="event-name-container">
            <p className="event-copy" id="event-title">Lesson 1</p>
            <p className="event-copy" id="event-subtitle">An Introduction to Self-Regulation Strategies for Bias</p>
          </div>
        </div>

      </div>

    </div>
  )
}