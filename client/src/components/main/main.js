import React, { useEffect } from 'react';
import { useAuth } from '../../context/context';
import Profile from '../profile/profile';
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
      <Profile />
      <h2>This is Main</h2>
      <p>Lorem ipsum</p>
    </div>
  );
}

export default Main;