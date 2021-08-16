import React, { useContext, useState, useEffect } from 'react';

const AuthContext = React.createContext();

export function AuthProvider({children}) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext);
}

const useProvideAuth =  () => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }

  const logout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  }

  useEffect(() => {
    if (user == null) {
      const storage = JSON.parse(sessionStorage.getItem('user'));
      setUser(storage);
    }
  }, [user]);

  return {
    user,
    login,
    logout  
  }
}