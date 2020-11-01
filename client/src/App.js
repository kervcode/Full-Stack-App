import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Public from "./components/Public";
import NotFound from "./components/NotFound";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import Authenticated from "./components/Authenticated";

import './App.css';
import { Provider } from './components/Context/Index';

function App() {
  return (
    <Router>
      <Provider>
          <div>
          <Header />

          <Switch>
            {/* <Route exact path="/" component={Header}/> */}
          </Switch>
        </div>
      </Provider>
  </Router>
  );
}

export default App;
