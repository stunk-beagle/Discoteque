import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";

import config from '../firebaseConfig'
import { withGlobalState } from 'react-globally'  
import firebase from 'firebase';

class Login extends React.Component{
  constructor(props) {
    super(props)
    firebase.initializeApp(config);

    this.state = {
        loggedIn: false
    }
  }
  
    // let { from } = location.state || { from: { pathname: "/" } };
    signIn=()=>{
      this.setState({
        isLoggedIn:true
      })
      this.props.setGlobalState({
            isLoggedIn: true
          })
      // let history = useHistory();
      // let location = useLocation();let { from } = location.state || { from: { pathname: "/" } };

        // var user=null
        // var provider = new firebase.auth.GoogleAuthProvider();
        // firebase.auth().signInWithPopup(provider).then(function(result) {
        //   // This gives you a Google Access Token. You can use it to access the Google API.
        //   var token = result.credential.accessToken;
        //   // The signed-in user info.
        //   user = result.user.toJSON();

        //   this.props.setGlobalState({
        //     isLoggedIn: true
        //   })
    
        //   this.setState({
        //     isLoggedIn:true
        //   })
        //   // ...
        // }).catch(function(error) {
        //   // Handle Errors here.
        //   var errorCode = error.code;
        //   var errorMessage = error.message;
        //   // The email of the user's account used.
        //   var email = error.email;
        //   // The firebase.auth.AuthCredential type that was used.
        //   var credential = error.credential;
        //   // ...
        // });
      }
  
    render(){
      console.log(this.state.isLoggedIn)
      return (
        !(this.state.isLoggedIn)
        ?(
          <div>
              <h1>Login</h1>
              <button onClick={this.signIn}>Google</button>
          </div>
      )    
        :
        (<Redirect to="/home"/>)  
      );
    }

  }

export default withGlobalState(Login)  