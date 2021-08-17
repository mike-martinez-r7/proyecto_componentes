import React, { useState, useEffect } from 'react';
import { Button, Input, Form, FormGroup, Alert } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import md5 from 'md5';
import axios from 'axios';
import './login.css';
import { useAuth } from '../../context/context';

const Login = () => {
  // Properties
  const auth = useAuth();
  const history = useHistory();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [state, setState] = useState('init');
  const [validEmail, setValidEmail] = useState('');
  const [validPassword, setValidPassword] = useState('');
    
  //Events
  const validate = () => {
    let isValid = true;
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailRegex.test(email)) {
      setValidEmail('');
    } else {
      setValidEmail('is-invalid');
      isValid = false;
    }

    if (password !== '') {
      setValidPassword('');
    } else {
      setValidPassword('is-invalid');
      isValid = false;
    }

    return isValid;
  };

  const login = (e) => {
    e.preventDefault();

    if (!validate()) {
      setMessage('There are some errors in the form');
    } else {
      setState('loading');
      setMessage('');

      axios({
        url: 'http://boyataapi-env.eba-rghaf25n.us-east-1.elasticbeanstalk.com/api/users/login',
        method: 'POST',
        headers: {'Access-Control-Allow-Origin': '*'},
        responseType: 'json',
        data: {
          email: email,
          password: md5(password)
        }
      })
      .then((response) => {
        let userExists = response.data.success;

        if (userExists) {
          auth.login(response.data.data);
        } else {
          setMessage(response.data.message);
        }

        setState('init');
      })
      .catch((error) => {
        let errors = '';

        error.response.data.message.forEach(e => {
          errors += e.message;
        }); 

        setMessage(errors);
        setState('init');
      });
    }
  };

  useEffect(() => {
    if (auth.user && auth.user.id) {
      history.push('/main');
    }
  });

  //Render
  return (
    <div className="login">
      <div className="row">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 text-end d-none d-md-block">
            <img src={ process.env.PUBLIC_URL + '/img/phone.png' } alt="Mobile" title="Mobile" />
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <h1>Login</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                { message !== '' ? <Alert id="alert" color="danger">{ message }</Alert> : '' }
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <Form onSubmit={ login }>
                  <FormGroup>
                    <Input 
                      type="text" 
                      name="email" 
                      id="email" 
                      value={ email }
                      placeholder="Email" 
                      onChange={ e => setEmail(e.target.value) } 
                      className={ validEmail }
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input 
                      type="password" 
                      name="password" 
                      id="password"
                      value={ password } 
                      placeholder="Password" 
                      onChange={ e => setPassword(e.target.value) } 
                      className={ validPassword }
                    />
                  </FormGroup><br />

                  <Button type="sumbit" color="primary" disabled={ state === 'loading' }>
                    Login&nbsp; 
                    <div className="spinner-border spinner-border-sm" role="status" style={ state === 'loading' ? {display: 'block'} : {display: 'none'} }>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </Button>
                </Form>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <br />
                <p>Don't have an account? <Link to="/register">Register</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;