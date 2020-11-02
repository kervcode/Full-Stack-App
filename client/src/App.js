import React from 'react';
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



function App() {
  // const [data, setData] = useState([]) 
  return (
    <Router>
      {/* <Provider> */}
          <div>
            <Header />
            <Switch>
              <Route exact path="/">
                <Redirect to="/courses/api" component={()=> <Courses data={'data'} />} />
                
                <Redirect 
                   to={{
                    pathname: "/test/new",
                    state: { property_id: property_id }
          }}
                />
              </Route>
            
            </Switch>
        </div>
      {/* </Provider> */}
  </Router>
  );
}

export default App;
