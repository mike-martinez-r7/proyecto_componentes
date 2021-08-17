import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/context';
import { useHistory, Link } from 'react-router-dom';

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
    <div className="profile float-end">
      { auth.user !== null ? <img src={ process.env.PUBLIC_URL + '/img/user-icon.png' } alt="User" title="User" /> : '' }&nbsp;
      { auth.user !== null ? auth.user.name + ' ' + auth.user.lastname : '' } &nbsp;
      { auth.user !== null ? <Link onClick={ logout }><img src={ process.env.PUBLIC_URL + '/img/logout-icon.png' } alt="Logout" title="Logout" /></Link> : '' }
    </div>
  );
}

export default Profile;