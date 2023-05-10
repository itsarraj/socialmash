import { createContext } from 'react';
import { useProvideAuth } from '../hooks/index';

const initialState = {
    user: null,
    login: () => {},
    login: () => {},
    loading: true,
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
