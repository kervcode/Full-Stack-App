import React, { Component } from 'react';
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


import './App.css';
// import { Provider } from './components/Context/Index';

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
            <Route exact path="/signUp" component={UserSignUp} />
            <Route exact path="/signOut" component={UserSignOut} />
            </Switch>
        </div>
      {/* </Provider> */}
  </Router>
     );
  }
}
 




export default App;
