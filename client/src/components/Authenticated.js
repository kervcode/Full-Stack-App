import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({ context }) => {
  // const  authUser = context.authenticatedUser;
  return (
  <div className="bounds">
    <div className="grid-100">
      <Redirect to='/' />
    </div>
  </div>
  );
}