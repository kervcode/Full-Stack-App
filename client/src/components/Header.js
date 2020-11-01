import React from 'react';


function Header() {
  return (
    <>
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav><a className="signup" href="sign-up.html">Sign Up</a><a className="signin" href="sign-in.html">Sign In</a></nav>
        </div>
      </div>
      <hr />
    </>
  )
}

export default Header;