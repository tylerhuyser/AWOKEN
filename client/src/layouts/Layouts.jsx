import React from 'react'
import Header from '../components/Header'

export default function Layout (props) {
  
  const { currentUser, handleLogout } = props;

  return (
    <div className="App">
      <Header
        currentUser={currentUser}
        handleLogout={handleLogout}
      />
      {props.children}
    </div>
  )
}
