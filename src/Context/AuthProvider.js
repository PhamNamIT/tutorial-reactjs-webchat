import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { Spin } from 'antd'

export const AuthContext = createContext();

const AuthProvider = (children) => {
   const history = useNavigate();

   const [user, setUser] = useState();
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const unsubscibe = auth.onAuthStateChanged((user) => {
         console.log({user});
         if (user) {
            const { displayName, email, userId, photoURL } = user;
            setUser({
               displayName, email, userId, photoURL
            });
            setIsLoading(false);
            history('/');
         }

         history('/login');
      });
      
      // Clean Function
      return () => {
         unsubscibe();
      }
   }, [history]);
   

   return ( 
      <AuthContext.Provider value={{ user }}>
         {isLoading ? <Spin /> : children}
      </AuthContext.Provider>
    );
}

export default AuthProvider;