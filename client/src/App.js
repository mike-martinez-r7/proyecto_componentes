import './App.css';
import Login from './components/login/login.js';
import Register from './components/register/register.js';
import Main from './components/main/main.js';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AuthContext } from './context/context';

function App() {
  const [isUserLogged, setUserLogged] = useState(false);
  const value = { isUserLogged, setUserLogged };

  return (
    <div className="App container-fluid">
      <AuthContext.Provider value={value}>
        hola: ({ isUserLogged.toString() })
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
      </AuthContext.Provider>
    </div>
  );
}

export default App;
