// src/pages/admin/UsersPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseLayout from '../../components/common/BaseLayout';
import '../../style/conteiner.css'

const UsersPage = () => {
  const navigate = useNavigate();

  const handleAlunos = () => {
    navigate('/alunos'); // Substitua pelo caminho da página de adicionar usuário
  };

  const handleProfessores = () => {
    navigate('/professores'); // Substitua pelo caminho da página de edição de alunos
  };

  const handleAdministradores = () => {
    navigate('/administradores'); // Substitua pelo caminho da página de edição de professores
  };

  return (
    <BaseLayout>
      <div className="page-conteiner">
        <div className="content-container">
            <div className="page-container">
              <h2>Usuários</h2>
              <button className="button" onClick={handleAlunos}>Alunos</button>
              <button className="button" onClick={handleProfessores}>Professores</button>
              <button className="button" onClick={handleAdministradores}>Administradores</button>
              {/* Adicione mais conteúdo e componentes específicos para usuários */}
            </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default UsersPage;
