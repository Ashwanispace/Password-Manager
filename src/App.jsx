// src/App.jsx

import React,{useContext} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider,AuthContext } from './context/AuthContext';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/signup" />;
};

const AuthRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? <Navigate to="/dashboard" /> : children;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Authenticated users should not see signup or login */}
                    <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />
                    <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
                    
                    {/* Unauthenticated users should not see the dashboard */}
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                    {/* Default route for unauthenticated users */}
                    <Route path="*" element={<Navigate to="/signup" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
