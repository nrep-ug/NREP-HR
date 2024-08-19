// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { signin } from '../services/api.js';
import storageUtil from '../utils/storageUtil';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check localStorage when the component mounts
        const storedAuth = storageUtil.getItem('isAuthenticated');
        if (storedAuth === true) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (userID, password) => {
        const response = await signin(userID, password);

        if (response.ok) {
            const result = await response.json();
            if (result.success) {
                setIsAuthenticated(true);
                storageUtil.setItem('isAuthenticated', true); // Store authentication state in localStorage
                return true;
            }
        }

        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        storageUtil.removeItem('isAuthenticated'); // Remove authentication state from localStorage
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
