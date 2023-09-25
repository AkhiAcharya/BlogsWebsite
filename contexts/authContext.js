import { createContext } from 'react';

const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export default AuthContext;