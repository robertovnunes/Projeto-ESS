// src/pages/admin/UsersPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseLayout from '../../components/common/BaseLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../../style/container.css'

const UsersPage = () => {
  const navigate = useNavigate();

  const handleAlunos = () => {
    navigate('/usuarios/alunos'); // Substitua pelo caminho da página de adicionar usuário
  };

  const handleProfessores = () => {
    navigate('/usuarios/professores'); // Substitua pelo caminho da página de edição de alunos
  };

  const handleAdministradores = () => {
    navigate('usuarios/administradores'); // Substitua pelo caminho da página de edição de professores
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
        <h2>Usuários</h2>
      </div>
      <div className="button-container">
        <button className="button" onClick={handleAlunos}>Alunos</button>
        <button className="button" onClick={handleProfessores}>Professores</button>
        <button className="button" onClick={handleAdministradores}>Administradores</button>
      </div>
      {/* Adicione mais conteúdo e componentes específicos para usuários */}
    </div>
  </div>
</BaseLayout>

  );
};

export default UsersPage;
