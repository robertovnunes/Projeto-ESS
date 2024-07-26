import React from 'react';
import {createBrowserRouter} from "react-router-dom";

import LoginPage from '../pages/login';
import MainPage from '../pages/MainPage';
import Home from '../pages/Home';
import Equipamentos from "../pages/equipamentos/Main";
import UsersPage from '../pages/administrador/usuarios'; // Página para Usuários
import RoomsPage from '../pages/administrador/salas'; // Página para Salas
import SubjectsPage from '../pages/administrador/disciplinas'; // Página para Disciplinas
import EquipmentPage from '../pages/administrador/equipamentos'; // Página para Equipamentos
import EventsPage from '../pages/administrador/eventos'; // Página para Eventos

import AlunosPage from '../pages/administrador/alunosPage';
import ProfessoresPage from '../pages/administrador/professoresPage';
import AdministradoresPage from '../pages/administrador/administradoresPage';

import AddAlunoPage from '../pages/administrador/AddAlunoPage'; // Importe a nova página
import AddProfessorPage from '../pages/administrador/AddProfessorPage'
import AddAdminPage from '../pages/administrador/AddAdminPage'

const isAuthenticated = true; // Simula estado de autenticação

const router = createBrowserRouter([

    {path: "/", element: <Home />},
    {path: "/equipamentos", element: <Equipamentos />},
    {path:"/login", element:<LoginPage />},
    {path: "/mainpage", element: isAuthenticated ? MainPage : "/login"},

]);

export default router;