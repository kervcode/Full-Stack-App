import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Public from "./components/Public";
import NotFound from "./components/NotFound";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import Authenticated from "./components/Authenticated";
import Courses from './components/Courses';
import CourseDetail from "./components/CourseDetail"

import './App.css';
// import { Provider } from './components/Context/Index';

class App extends Component {
  render() { 
    return ( 
      <Router>
      {/* <Provider> */}
          <div>
            <Header />
            <Switch>
            <Route exact path="/" component={()=> <Courses data={'data'}/>}/> 
            {/*
              // <Redirect from='/' to='/api/courses' />
              // <Route exact path="/api/courses" render={()=> <Courses />} />
            */}
            </Switch>
        </div>
      {/* </Provider> */}
  </Router>
     );
  }
}
 




export default App;
