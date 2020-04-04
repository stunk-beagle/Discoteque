import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import App from "../App";
import { withGlobalState } from 'react-globally'
import Login from "../routes/LoginPage"
// import config from "../firebaseConfig"
// import firebase from 'firebase'
// import logo from '../images/logo.png'
import '../css/Main.css';


const PrivateRoute = ({ component, isAuthed, ...rest }) => {
  return (
      <Route {...rest} exact
          render={(props) => (
              isAuthed ? (
                  <div>
                      {React.createElement(component, props)}
                  </div>
              ) :
                  (
                      <Redirect
                          to={{
                              pathname: '/',
                              state: { from: props.location }
                          }}
                      />
                  )
          )}
      />
  )
}

class Main extends React.Component {
  render() {
      return (
          <Switch>
              <Route exact path="/" component={Login} />
              <PrivateRoute exact path="/home" component={App} isAuthed={this.props.globalState.isLoggedIn} />
          </Switch>
      )
  }
}

export default withGlobalState(Main)

