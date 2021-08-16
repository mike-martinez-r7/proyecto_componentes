import './App.css';
import Login from './components/login/login.js';
import Register from './components/register/register.js';
import Main from './components/main/main.js';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/context';

function App() {
  return (
    <div className="App container-fluid">
      <AuthProvider>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/main">Main</Link>
                </li>
              </ul>
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
