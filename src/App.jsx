import React from 'react';
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import VerifyToken from './pages/VerifyToken';
import ResetPassword from './pages/ResetPassword';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';

function App() {
  
  return (
    <div className='App'>
    <Router>
      <ToastContainer />
      <Header/>
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-token/:token" element={<VerifyToken />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        
        </Router>
    </div>
  )
}

export default App