import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
        const [user, setUser] = useState({});
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [profile,setProfile] = useState({})
        const [csrftoken,setCsrftoken] = useState()
        return (
            <AuthContext.Provider value={{ user, setUser,isLoggedIn,setIsLoggedIn,profile,setProfile,csrftoken,setCsrftoken}}>
            {children}
            </AuthContext.Provider>
        );
};

export const useAuth = () => {
  return useContext(AuthContext);
};