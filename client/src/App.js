import './App.css';
import React, { Fragment } from 'react';
import Navbar from "./components/layout/Navbar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from './components/layout/Alert';

import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState"

import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute'


if(localStorage.token){
  setAuthToken(localStorage.token)
}
function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <div className="App">
            <Router>
                <Fragment>
                  <Navbar />
                    <div className="container">  
                      <Alert />
                      <Switch>
                        <PrivateRoute exact path="/" component={Home} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                      </Switch>
                    </div>
                </Fragment>
              </Router>
          </div>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
