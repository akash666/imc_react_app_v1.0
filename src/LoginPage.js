import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import App from './App';
import './LoginPage.css';
import {w3cwebsocket} from 'websocket';
import { useNavigate, unstable_HistoryRouter } from "react-router-dom";
const client = new w3cwebsocket('ws://localhost:8000');

function LoginPage() {
    const [errorMessages, setErrorMessages] = useState({});
    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        client.onopen = () => 
        {
          console.log('Websocket client connected to the server');
        }

        client.onmessage = (event) => 
        { 
          var data = JSON.parse(event.data);
          console.log('got reply --> ', data);
        }

        client.onclose = () => 
        {
          console.log(`[close]` ,'Connection died');
        }

        client.onerror = function(error) {
          console.log(`[error] `, error);
        };

        const handleTabClose = event => {
            event.preventDefault();
            console.log('beforeunload event triggered from login window');
            client.onclose = function () {}; // disable onclose handler first
            client.close();
            //return (event.returnValue = 'Are you sure you want to exit?');
        };
        window.addEventListener('beforeunload', handleTabClose);
    }, []);

  // User Login info
  const database = [
    {
        username: "user1",
        password: "pass1"
    },
    {
        username: "user2",
        password: "pass2"
    },
    {
        username: "user3",
        password: "pass3"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    var { uname, pass } = document.forms[0];
    // Find user login info
    const userData = database.find((user) => user.username === uname.value);
    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        
        setAuthenticated(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <>{isAuthenticated ? <App client={client}/> : renderForm}</>
    
  );
}

export default LoginPage; 