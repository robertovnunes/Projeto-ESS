// src/pages/admin/UsersPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseLayout from '../../components/common/BaseLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../../style/container.css'
import '../../style/group_button.css';

const UsersPage = () => {
  const navigate = useNavigate();

  const handleAlunos = () => {
    navigate('/usuarios/alunos'); //caminho da página de adicionar usuário
  };

  const handleProfessores = () => {
    navigate('/usuarios/professores'); //caminho da página de edição de alunos
  };

  const handleAdministradores = () => {
    navigate('/usuarios/admins'); //caminho da página de edição de professores
  };

  const handleGoBack = () => {
    navigate('/mainpage'); // Navega para a página principal
  };

  return (
<BaseLayout>
  <div className="page-container">
    <div className="content-container">
      <div className="header-container">
        <button className="back-button" onClick={handleGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
      <h1>Usuários</h1>
      <div className="button-group">
        <button className="group-button" onClick={handleAlunos}>Alunos</button>
        <button className="group-button" onClick={handleProfessores}>Professores</button>
        <button className="group-button" onClick={handleAdministradores}>Administradores</button>
      </div>
    </div>
  </div>
</BaseLayout>

  );
};

export default UsersPage;
