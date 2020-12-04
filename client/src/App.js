import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Courses from './components/Courses';
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import Authenticated from './components/Authenticated';


// New import
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

// connect Header, Authenticated, UserSignUp and UsersignIn to Context
const HeaderWithContext = withContext(Header)
const AuthWithContext= withContext(Authenticated);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);


export default () => (
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" render={(props)=> <Courses {...props}/>}/>
        <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route exact path="/courses/create"    render={(props) => <CreateCourse {...props} />} />      
        <Route exact path="/courses/:id"    render={(props)=> <CourseDetail {...props}/>} />   
        <Route exact path="/courses/:id/update"    render={(props) => <UpdateCourse {...props}/>} /> 
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
