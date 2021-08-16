import React from 'react';

export const AuthContext = React.createContext({
  isUserLogged: false,
  setUserLogged: () => {}
});