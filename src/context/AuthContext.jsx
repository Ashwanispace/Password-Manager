import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    function getCsrfToken() {
        const csrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];
        return csrfToken;
    }

    const [user, setuser] = useState(null);
    const [Errors, setErrors] = useState("");


    const login = async (username, password) => {
        let csrfToken = getCsrfToken();
        setErrors(""); // Clear previous errors before login attempt
        try {
            const response = await axios.post('http://localhost:8000/api/login', { username, password }, {
                headers: {
                    'Content-Type': 'application/json',
                    //'X-CSRFToken': csrfToken
                },
                withCredentials: true
            });

            if (response.data.username) {
                setuser(response.data.username);
            }

        } catch (error) {
            // Handle the error and store in errors state
            if (error.response && error.response.data) {
                setErrors(error.response.data.error);
            } else {
                setErrors('An error occurred during login');
            }
        }
    };

    const logout = async () => {
        let csrfToken = getCsrfToken();
        try {
            await axios.post('http://localhost:8000/api/logout',{}, {
                headers: {
                    'Content-Type': 'application/json',
                    //'X-CSRFToken': csrfToken
                },
                withCredentials: true
            });
            setuser(null);
        } catch (error) {
            // Handle logout errors if necessary
            setErrors('An error occurred during logout');
        }
    };

    const signup = async (username, password) => {
        let csrfToken = getCsrfToken();
        setErrors(); // Clear previous errors before signup attempt
        try {
            await axios.post('http://localhost:8000/api/signup', { username, password }, {
                headers: {
                    'Content-Type': 'application/json',
                    //'X-CSRFToken': csrfToken
                },
                withCredentials: true
            });
            await login(username, password); // Log the user in after signup
        } catch (error) {
            // Handle signup error and store in errors state
            if (error.response && error.response.data) {
                setErrors(error.response.data.error);
            } else {
                setErrors('An error occurred during signup');
            }
        }
    };

    useEffect(() => {
        let csrfToken = getCsrfToken();
        const checkUserAuthentication = async () => {
            try {

                const response = await axios.get('http://localhost:8000/api/check-auth', { 
                    headers: {
                        'Content-Type':'application/json',
                        //'X-CSRFToken': csrfToken
                      },
                    withCredentials: true });
                if (response.data.username) {
                    setuser(response.data.username);
                }

            } catch (error) {
                console.log('error');
            }
        };

        checkUserAuthentication();
    }, []);  


    return (
        <AuthContext.Provider value={{ user, setuser, login, logout, signup, Errors, setErrors }}>
            {children}
        </AuthContext.Provider>
    );

};
