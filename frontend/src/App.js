import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import LoginPage from './pages/login';
import MainPage from './pages/MainPage';
import Home from './pages/Home';

import axios from 'axios';

// Defina a URL base para todas as requisições Axios
axios.defaults.baseURL = 'http://localhost:3001';

const App = () => {
  const isAuthenticated = true; // Simula estado de autenticação

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mainpage" element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirecionamento para a Home se a rota não for encontrada */}
      </Routes>
    </Router>
  );
};

export default App;
