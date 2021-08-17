import React, { useState } from 'react';
import { Button, Input, Form, FormGroup, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './register.css';

const Register = () => {
  //Properties
  const [state, setState] = useState('init');
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    lastname: '',
    password: '',
    passwordconfirm: '',
    day: 0,
    month: 0,
    year: 0
  });

  const [validEmail, setValidEmail] = useState(true);
  const [validName, setValidName] = useState(true);
  const [validLastname, setValidLastname] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validPasswordConfirm, setValidPasswordConfirm] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [validDay, setValidDay] = useState(true);
  const [validMonth, setValidMonth] = useState(true);
  const [validYear, setValidYear] = useState(true);

  //Events
  const validate = () => {
    let isValid = true;
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailRegex.test(formData.email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
      isValid = false;
    }

    if (formData.name !== '') {
      setValidName(true);
    } else {
      setValidName(false);
      isValid = false;
    }

    if (formData.lastname !== '') {
      setValidLastname(true);
    } else {
      setValidLastname(false);
      isValid = false;
    }

    if (formData.password !== '') {
      setValidPassword(true);
    } else {
      setValidPassword(false);
      isValid = false;
    }

    if (formData.passwordconfirm !== '') {
      setValidPasswordConfirm(true);
    } else {
      setValidPasswordConfirm(false);
      isValid = false;
    }

    if (formData.password === formData.passwordconfirm) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }

    if (formData.day !== 0) {
      setValidDay(true);
    } else {
      setValidDay(false);
      isValid = false;
    }

    if (formData.month !== 0) {
      setValidMonth(true);
    } else {
      setValidMonth(false);
      isValid = false;
    }

    if (formData.year !== 0) {
      setValidYear(true);
    } else {
      setValidYear(false);
      isValid = false;
    }

    return isValid;
  };

  const getDays = () => {
    let days = [];

    for (let i=1; i<=31; i++) {
      days.push(i);
    }

    return days;
  };

  const getYears = () => {
    let years = [];

    for (let i=2021; i>=1970; i--) {
      years.push(i);
    }

    return years;
  };

  const register = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      setMessage('There are some errors in the form');
    } else {
      setState('loading');
      setMessage('');

      axios({
        url: 'http://boyataapi-env.eba-rghaf25n.us-east-1.elasticbeanstalk.com/api/users',
        method: 'POST',
        headers: {'Access-Control-Allow-Origin': '*'},
        responseType: 'json',
        data: {
          email: formData.email,
          name: formData.name,
          lastname: formData.lastname,
          password: formData.password,
          datebirth: formData.year + '-' + formData.month + '-' + formData.day + ' 00:00:00',
          company: '0a7cdbf0-f010-11eb-b6cb-2129e25dd2e1'
        }
      })
      .then((response) => {
        let registered = response.data.success;

        if (registered) {
          setState('sent');
          setFormData({
            email: '',
            name: '',
            lastname: '',
            password: '',
            passwordconfirm: '',
            day: 0,
            month: 0,
            year: 0
          });

          alert('Register OK');
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

  //Render
  return (
    <div className="login">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          { message !== '' ? <div className="alert alert-danger" role="alert">{ message }</div> : '' }
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <h1>Register</h1>{state.emailState}
        </div>
      </div>
      <Form onSubmit={ register }>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <FormGroup>
              <Input 
                type="text" 
                name="email" 
                id="email" 
                value={ formData.email }
                placeholder="Email" 
                onChange={ e => setFormData({ ...formData, email: e.target.value }) } 
                className={ validEmail ? '' : 'is-invalid' }
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <FormGroup>
              <Input 
                type="text" 
                name="name" 
                id="name" 
                value={ formData.name }
                placeholder="Name" 
                onChange={ e => setFormData({ ...formData, name: e.target.value }) } 
                className={ validName ? '' : 'is-invalid' }
              />
            </FormGroup>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <FormGroup>
              <Input 
                type="text" 
                name="lastname" 
                id="lastname" 
                value={ formData.lastname }
                placeholder="Lastname" 
                onChange={ e => setFormData({ ...formData, lastname: e.target.value }) } 
                className={ validLastname ? '' : 'is-invalid' }
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <FormGroup>
              <Input 
                type="password" 
                name="password" 
                id="password"
                value={ formData.password } 
                placeholder="Password" 
                onChange={ e => setFormData({ ...formData, password: e.target.value}) } 
                className={ validPassword ? '' : 'is-invalid' }
              />
            </FormGroup>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <FormGroup>
              <Input 
                type="password" 
                name="passwordconfirm" 
                id="passwordconfirm"
                value={ formData.passwordconfirm } 
                placeholder="Cornfirm Password" 
                onChange={ e => setFormData({ ...formData, passwordconfirm: e.target.value}) } 
                className={ validPasswordConfirm ? '' : 'is-invalid' }
              />
              <small className="text-danger" style={ !passwordMatch ? {display: 'block'} : {display: 'none'} }>* Passwords must match</small>
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <FormGroup>
              <Label for="day">Day</Label>
              <Input 
                type="select" 
                name="day" 
                id="day" 
                placeholder="Day" 
                onChange={ e => setFormData({ ...formData, day: e.target.value}) } 
                className={ 'form-select' && validDay ? '' : 'is-invalid' }
              >
                <option value="0"></option>
                { getDays().map((value, key) => <option value={value} key={key}>{value}</option>) }
              </Input>
            </FormGroup>
          </div>
          <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <FormGroup>
              <Label for="month">Month</Label>
              <Input 
                type="select" 
                name="month" 
                id="month" 
                placeholder="Month"
                onChange={ e => setFormData({ ...formData, month: e.target.value}) } 
                className={ validMonth ? '' : 'is-invalid' }
              >
                <option value="0"></option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </Input>
            </FormGroup>
          </div>  
          <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <FormGroup>
              <Label for="year">Year</Label>
              <Input 
                type="select" 
                name="year" 
                id="year" 
                placeholder="Year"
                onChange={ e => setFormData({ ...formData, year: e.target.value}) } 
                className={ validYear ? '' : 'is-invalid' }
              >
                <option value="0"></option>
                { getYears().map((value, key) => <option value={value} key={key}>{value}</option>) }
              </Input>
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <Button type="sumbit" color="primary" disabled={ state === 'loading' || state === 'sent' }>
              Sign up&nbsp; 
              <div className="spinner-border spinner-border-sm" role="status" style={ state === 'loading' ? {display: 'block'} : {display: 'none'} }>
                <span className="visually-hidden">Loading...</span>
              </div>
            </Button> 

            <p><span>By signing up, you agree to our <Link to="/termsofuse">terms of use</Link></span></p>
          </div>
        </div>
      </Form>
      
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
          <p><span>Already have an account? </span><Link to="/">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;