import React, { Component } from 'react'
import config from "./firebaseConfig"
import './css/App.css';
import Firebase from 'firebase';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'; 
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import logo from './images/logo.png'
import Upload from './routes/Upload'
import Catalogue from './routes/Catalogue'
import Home from './routes/Home'



export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      isSignedIn:false,
      user:null,
    }
     
  }
 
  render () {
    console.log(this.state)
    return (
      <Router> 
        <div className="main"> 
          <div className="header">
            <div className="container">
              <img className="img" src={logo}/>
            </div>

          </div>

            <div className="nav">
              <div className="container">
                <ul> 
                  <li> 
                    <Link to="/home">Home</Link> 
                  </li> 
                  <li> 
                    <Link to="/home/upload">Upload</Link> 
                  </li> 
                  <li> 
                    <Link to="/home/catalogue">Catalogue</Link> 
                  </li> 
                </ul> 
              </div>
            </div>    



            <Switch> 
              <Route exact path='/home' component={Home}></Route> 
              <Route exact path='/home/upload' component={Upload}></Route> 
              <Route exact path='/home/catalogue' component={Catalogue}></Route> 
            </Switch>
          
        </div> 
      </Router> 
    )
  }
}

