import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { Spin } from 'antd';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
   const history = useNavigate();

   const [user, setUser] = useState({});
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const unsubscibed = auth.onAuthStateChanged((user) => {
         if (user) {
            const { displayName, email, uid, photoURL } = user;
            setUser({
               displayName,
               email,
               uid,
               photoURL,
            });
            setIsLoading(false);
            history('/');
            return;
         }

         setIsLoading(false);
         history('/login');
      });
      
      // Clean Function
      return () => {
         unsubscibed();
      }
   }, [history]);
   

   return ( 
      <AuthContext.Provider value={{ user }}>
         {isLoading ? <Spin /> : children}
      </AuthContext.Provider>
    );
}

export default AuthProvider;