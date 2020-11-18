import React, { Component } from 'react';

import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Public from "./components/Public";
import NotFound from "./components/NotFound";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import Authenticated from "./components/Authenticated";
import Courses from './components/Courses';
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";

// Import context API to App
import withContext from "./components/Context/Context"

// Initialize name variable for User Sign Up
const UserSignUpWithContext = withContext(UserSignUp);



class App extends Component {
  render(props) { 
    return ( 
      <Router>
      {/* <Provider> */}
          <div>
            <Header />
            <Switch>
            <Route exact path="/" render={(props)=> <Courses {...props}/>}/> 
            <Route exact path="/courses/create"    render={(props) => <CreateCourse {...props} />} />      
            <Route exact path="/courses/:id"    render={(props)=> <CourseDetail {...props}/>} />   
            <Route exact path="/courses/:id/update"    render={(props) => <UpdateCourse {...props}/>} /> 
            <Route exact path="/signin" component={UserSignIn} />
            {/* <Route exact path="/signUp" component={UserSignUp} /> */}
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route exact path="/signOut" component={UserSignOut} />
            <Route component={NotFound} />
            </Switch>
        </div>
      {/* </Provider> */}
  </Router>
     );
  }
}
 




export default App;
