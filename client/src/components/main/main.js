import React, { useEffect } from 'react';
import { useAuth } from '../../context/context';
import { useHistory } from 'react-router-dom';

const Main = () => {
  const auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (auth.user === null) {
      history.push('/');
    }
  });

  return (
    <div>
      <h2>Activities avalilable</h2>
      <p>Chose the activities you are interested</p>
    </div>
  );
}

export default Main;