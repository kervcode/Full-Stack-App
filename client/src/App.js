import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
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
import UnhandledError from './components/UnhandledError';


// New import
import withContext from './Context';
import PrivateRoute from './PrivateRoute';
import Forbidden from './components/Forbidden';

// connect Header, Authenticated, UserSignUp and UsersignIn to Context
const HeaderWithContext = withContext(Header)
const AuthWithContext= withContext(Authenticated);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse)



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
        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />      
        <Route exact path="/courses/:id" component={CourseDetailWithContext} />   
        <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} /> 
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/notfound" component={NotFound} />
        <Route path="/error" component={UnhandledError} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
