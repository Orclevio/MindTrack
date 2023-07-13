import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [crp, setCrp] = useState('');
  
  return (
    <UserContext.Provider value={{ nome, setNome, email, setEmail, crp, setCrp }}>
      {children}
    </UserContext.Provider>
  );
};
