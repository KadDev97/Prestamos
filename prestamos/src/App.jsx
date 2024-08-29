import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/initialPage/login';
import Register from './components/initialPage/register';
import Home from './components/Home/index';
import ClientLoan from './components/ClientLoan/index';
import Navbar from './components/Navbar/index';
import AddClient from './components/AddClient/index';
import CreateLoan from './components/CreateLoan/index';
import { ClientProvider } from './contexts/ClientContext';
import './App.css';

const App = () => {
    return (
        <ClientProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<><Navbar /><Home /></>} />
                    <Route path="/add-client" element={<><Navbar /><AddClient /></>} />
                    <Route path="/create-loan" element={<><Navbar /><CreateLoan /></>} />
                    <Route path="/client-loan/:clientId" element={<><Navbar /><ClientLoan /></>} />
                </Routes>
            </Router>
        </ClientProvider>
    );
};

export default App;
