import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
  const { currentUser, handleLogout } = props;

  return (
    <div className="header"> 
      <h1>Tasteville</h1>
      {
        currentUser ?
          <>
            <p>{currentUser.username}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
          :
          <Link to='/login'>Login/Register</Link>
      }
      <hr />
      {
        currentUser &&
        <>
          <Link to='/foods'>Foods</Link>
          <Link to='/flavors'>Flavors</Link>
        </>
      }
    </div>
  )
}
