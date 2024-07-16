import { createContext, useContext } from 'react';
import { UserContextType } from './types';

const UserContext = createContext({} as UserContextType);

const useUser = () => useContext(UserContext);

export { useUser, UserContext };