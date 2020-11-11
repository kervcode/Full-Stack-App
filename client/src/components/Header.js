import React from 'react';
import {NavLink} from 'react-router-dom'


function Header() {
  return (
    <>
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav>
            <NavLink className="signup" to="/signup">Sign Up</NavLink>
            <NavLink className="signin" to="/signin">Sign In</NavLink>
          </nav>
        </div>
      </div>
      <hr />
    </>
  )
}

export default Header;