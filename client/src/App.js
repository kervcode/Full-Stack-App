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


// New import
import withContext from './Context';

const UserSignUpWithContext = withContext(UserSignUp);

export default () => (
  <Router>
    <div>
      <Header />

      <Switch>
        <Route exact path="/" render={(props)=> <Courses {...props}/>}/>
        <Route exact path="/courses/create"    render={(props) => <CreateCourse {...props} />} />      
        <Route exact path="/courses/:id"    render={(props)=> <CourseDetail {...props}/>} />   
        <Route exact path="/courses/:id/update"    render={(props) => <UpdateCourse {...props}/>} /> 
        <Route path="/signin" component={UserSignIn} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOut} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
