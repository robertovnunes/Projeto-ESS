import React from 'react';
import {createBrowserRouter, Navigate} from "react-router-dom";

import LoginPage from '../pages/login';
import MainPage from '../pages/MainPage';
import Home from '../pages/Home';
import Equipamentos from "../pages/equipamentos/Main";
import UsersPage from '../pages/administrador/usuarios'; // Página para Usuários
import RoomsPage from '../pages/administrador/salas'; // Página para Salas
import SubjectsPage from '../pages/administrador/disciplinas'; // Página para Disciplinas
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
    {path:"/login", element:<LoginPage />},
    {path: "/mainpage", element: isAuthenticated ? <MainPage /> : "/login"},

    {path: "/usuarios", element: <UsersPage />},
    {path: "/salas", element: <RoomsPage />},
    {path: "/disciplinas", element: <SubjectsPage />},
    {path: "/eventos", element: <EventsPage />},
    {path: "/equipamentos", element: <Equipamentos />},

    {path: "/usuarios/alunos", element: <AlunosPage />},
    {path: "/usuarios/professores", element: <ProfessoresPage />},
    {path: "/usuarios/admins", element: <AdministradoresPage />},

    {path: "/usuarios/alunos/adicionar", element: <AddAlunoPage />}, // Adicione a rota para a nova página
    {path: "/usuarios/professores/adicionar", element: <AddProfessorPage />},
    {path: "/usuarios/admins/adicionar", element: <AddAdminPage />},

    {path: "*", element: <Navigate to = "/mainpage" />},
]);

export default router;