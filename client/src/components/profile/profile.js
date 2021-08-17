import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { useAuth } from '../../context/context';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const auth = useAuth();
  const history = useHistory();
  const [profile, setProfile] = useState(auth.user);

  const logout = () => {
    auth.logout();
    history.push('/');
  };

  useEffect(() => {
    if (profile != null) {
      setProfile(auth.user);
    }
  }, [profile, auth]);

  return (
    <span className="profile">
      { profile !== null ? profile.name + ' ' + profile.lastname : '' } &nbsp;
      <Button onClick={ logout }>Logout</Button>
    </span>
  );
}

export default Profile;