import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../context/context';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import axios from 'axios';
import './main.css';

const Main = () => {
  const auth = useAuth();
  const history = useHistory();
  const [state, setState] = useState('init');
  const [activities, setActivities] = useState([]);
  const itemEls = useRef([]);
  const DATE_OPTIONS = { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };

  const subscribe = (id) => {
    console.log('Clicked on ' + id);
    
  };

  useEffect(() => {
    if (auth.user === null) {
      history.push('/');
    }

    const fetchData = async () => { 
      const result = await axios('http://boyataapi-env.eba-rghaf25n.us-east-1.elasticbeanstalk.com/api/activities');
      result.data.sort(( a, b ) => {
        if ( a.date < b.date ){
          return -1;
        }

        if ( a.date > b.date ){
          return 1;
        }

        return 0;
      });

      setActivities(result.data);
    };

    fetchData()
  }, []);

  if (activities !== 'loading')  {
    return (
      <div className="activities">
        <h2>Activities available</h2>
        <p>Chose the activities you are interested and subscribe</p>

        { 
          activities.map( (activity, key ) => (
            <div className="card" key={ key } ref={ (e) => itemEls.current.push(e) }>
              <div className="card-header">
                {(new Date(activity.date)).toLocaleDateString('en-US', DATE_OPTIONS)} &nbsp;&nbsp; | &nbsp;&nbsp;
                { new Date(activity.date).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3") }
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1">
                    <img src={ process.env.PUBLIC_URL + '/img/activity-icon.png' } alt="Activity" title="Activity" width="50" />
                  </div>
                  <div className="col-12 col-sm-12 col-md-11 col-lg-11 col-xl-11">
                    <h5 className="card-title">{ activity.name }</h5>
                    <p className="card-text">{ activity.descr }</p>
                    
                    <Button type="sumbit" color="primary" disabled={ state === 'loading' } onClick={ () => subscribe(activity.id) }>
                      Subscribe&nbsp; 
                      <div className="spinner-border spinner-border-sm" role="status" style={ state === 'loading' ? {display: 'block'} : {display: 'none'} }>
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )) 
        }
      </div>
    );
  }
}

export default Main;