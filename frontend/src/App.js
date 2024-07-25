import logo from './assets/logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import MainPage from './pages/MainPage';
import Home from './pages/Home';
import { ColorProvider } from './context/userColorContext';

import UsersPage from './pages/administrador/usuarios'; // Página para Usuários
import RoomsPage from './pages/administrador/salas'; // Página para Salas
import SubjectsPage from './pages/administrador/disciplinas'; // Página para Disciplinas
import EquipmentPage from './pages/administrador/equipamentos'; // Página para Equipamentos
import EventsPage from './pages/administrador/eventos'; // Página para Eventos

import AlunosPage from './pages/administrador/alunosPage';
import ProfessoresPage from './pages/administrador/professoresPage';
import AdministradoresPage from './pages/administrador/administradoresPage';

import AddAlunoPage from './pages/administrador/AddAlunoPage'; // Importe a nova página
import AddProfessorPage from './pages/administrador/AddProfessorPage'
import AddAdminPage from './pages/administrador/AddAdminPage'

import axios from 'axios';

// Defina a URL base para todas as requisições Axios
axios.defaults.baseURL = 'http://localhost:3001';

const App = () => {
  const isAuthenticated = true; // Simula estado de autenticação

  return (
    <ColorProvider>
      <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mainpage" element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Home />} />

        <Route path="/usuarios" element={<UsersPage />} />
        <Route path="/salas" element={<RoomsPage />} />
        <Route path="/disciplinas" element={<SubjectsPage />} />
        <Route path="/equipamentos" element={<EquipmentPage />} />
        <Route path="/eventos" element={<EventsPage />} />

        <Route path="/usuarios/alunos" element={<AlunosPage />} />
        <Route path="/usuarios/professores" element={<ProfessoresPage />} />
        <Route path="/usuarios/admins" element={<AdministradoresPage />} />

        <Route path="/usuarios/alunos/adicionar" element={<AddAlunoPage />} />
        <Route path="/usuarios/professores/adicionar" element={<AddProfessorPage />} />
        <Route path="/usuarios/admins/adicionar" element={<AddAdminPage />} />

        <Route path="*" element={<Navigate to="/mainpage" />} /> {/* Redirecionamento para a Home se a rota não for encontrada */}
      </Routes>
    </Router>
    </ColorProvider>
  );
};

export default App;
