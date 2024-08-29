// ClientContext.js
import React, { createContext, useState, useContext } from 'react';

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
    const [clients, setClients] = useState([]);

    return (
        <ClientContext.Provider value={{ clients, setClients }}>
            {children}
        </ClientContext.Provider>
    );
};

export const useClients = () => useContext(ClientContext);
