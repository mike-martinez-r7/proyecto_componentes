import './App.css';
import Login from './components/login/login.js';
import Register from './components/register/register.js';
import Profile from './components/profile/profile.js';
import Main from './components/main/main.js';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/context';

function App() {
  return (
    <div className="App container">
      <AuthProvider>
        <Router>
          <div>
            <nav>
              <Link to="/">
                <img src={ process.env.PUBLIC_URL + '/img/boyata-logo.png' } alt="Logo" title="Logo" />
              </Link>

              <Profile />
            </nav>
          
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/main">
                <Main />
              </Route>
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
