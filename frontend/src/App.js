import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import LoginPage from './pages/login';
import MainPage from './pages/MainPage';
import Home from './pages/Home';
import { ColorProvider } from './context/userColorContext';

import UsersPage from './pages/administrador/usuarios'; // Página para Usuários
import RoomsPage from './pages/administrador/salas'; // Página para Salas
import EquipmentPage from './pages/administrador/equipamentos'; // Página para Equipamentos

import AlunosPage from './pages/administrador/alunosPage';
import ProfessoresPage from './pages/administrador/professoresPage';
import AdministradoresPage from './pages/administrador/administradoresPage';

import AddAlunoPage from './pages/administrador/AddAlunoPage'; // Importe a nova página
import AddProfessorPage from './pages/administrador/AddProfessorPage'
import AddAdminPage from './pages/administrador/AddAdminPage'

import DisciplinePage from './pages/disciplines/disciplinePage';
import CreateDisciplinePage from './pages/disciplines/CreateDisciplinePage.js';
import DisciplineListPage from './pages/disciplines/disciplinesListPage.js';
import DisciplineEditPage from './pages/disciplines/disciplinesEditPage.js';
import DisciplineRoomsPage from './pages/disciplines/disciplineRoomsPage.js';
import DisciplineViewPage from './pages/disciplines/disciplineViewPage.js';

import EventsPage from './pages/events/eventsPage.js';
import CreateEventPage from './pages/events/CreateEventPage.js';
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
        <Route path="/equipamentos" element={<EquipmentPage />} />
        <Route path="/eventos" element={<EventsPage />} />

        <Route path="/usuarios/alunos" element={<AlunosPage />} />
        <Route path="/usuarios/professores" element={<ProfessoresPage />} />
        <Route path="/usuarios/admins" element={<AdministradoresPage />} />

        <Route path="/usuarios/alunos/adicionar" element={<AddAlunoPage />} />
        <Route path="/usuarios/professores/adicionar" element={<AddProfessorPage />} />
        <Route path="/usuarios/admins/adicionar" element={<AddAdminPage />} />

        <Route path="/disciplines" element={<DisciplinePage />} />
        <Route path="/create-discipline" element={<CreateDisciplinePage />} />    
        <Route path="/disciplines-list" element={<DisciplineListPage />} />    
        <Route path="/edit-discipline/:id" element={<DisciplineEditPage />} />
        <Route path="/discipline-rooms/:id" element={<DisciplineRoomsPage />} />
        <Route path= "/discipline-view" element={<DisciplineViewPage />} />

        <Route path="/events" element={<EventsPage />} />
          <Route path="/create-event" element={<CreateEventPage />} />

        <Route path="*" element={<Navigate to="/mainpage" />} /> {/* Redirecionamento para a Home se a rota não for encontrada */}
      </Routes>
    </Router>
    </ColorProvider>
  );
};

export default App;
