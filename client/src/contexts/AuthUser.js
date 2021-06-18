import Cookies from 'js-cookie';
import { useState, createContext, useContext } from 'react';

export const AuthUserContext = createContext();

export const AuthUserProvider = ({ children }) => {
  const [ username, setUsername ] = useState(Cookies.get('username'));
  
  return (
      <AuthUserContext.Provider value={{ username, setUsername }}>
          {children}
      </AuthUserContext.Provider>
  )
}

export const useAuthUserContext = () => {
  return useContext(AuthUserContext)
}
