import React, { useState } from 'react';
import { Button, Input, Form, FormGroup, Spinner, Alert } from 'reactstrap';
import md5 from 'md5';
import axios from 'axios';
import './login.css';

const Login = () => {
  // Properties
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [state, setState] = useState({
    status: '',
    validEmail: '',
    validPassword: ''
  });

  let validate = () => {
    let isValid = true;
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailRegex.test(email)) {
      setState({validEmail: 'is-valid'});
    } else {
      setState({validEmail: 'is-invalid'});
      isValid = false;
    }

    return isValid;
  };

  const login = () => {
    setState({status: 'loading'});
    
    if (!validate()) {
      setMessage('There are some errors in the form');
    } else {
      axios({
        url: 'http://boyataapi-env.eba-rghaf25n.us-east-1.elasticbeanstalk.com/api/users/login',
        method: 'post',
        headers: {'Access-Control-Allow-Origin': '*'},
        data: {
          email: email,
          password: md5(password)
        }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  };

  return (
    <div className="login">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
          { state.message === 'loading' ? <Alert color="danger">{ message }</Alert> : '' }
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <h1>Login</h1>{state.emailState}
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <Form>
            <FormGroup>
              <Input 
                type="text" 
                name="email" 
                id="email" 
                value={email}
                placeholder="Email" 
                onChange={e => setEmail(e.target.value)} 
                className={ state.validEmail }
              />
            </FormGroup>
            <FormGroup>
              <Input 
                type="password" 
                name="password" 
                id="password"
                value={password} 
                placeholder="Password" 
                onChange={e => setPassword(e.target.value)} 
              />
            </FormGroup>

            <Button 
              onClick={login} 
              color="primary" 
            >
              <span className="mr-4">Login</span>&nbsp;
              { state.status === 'loading' ? <Spinner color="light" size="sm"><span className="visually-hidden">Loading...</span></Spinner>: '' }
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;