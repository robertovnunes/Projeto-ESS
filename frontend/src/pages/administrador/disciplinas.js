// src/pages/SubjectsPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/admin/disciplinas.css'; // Adicione o CSS correspondente
import BaseLayout from '../../components/common/BaseLayout';

const SubjectsPage = () => {
  const navigate = useNavigate();

  const handleAddSubject = () => {
    navigate('/adicionar-disciplina'); // Substitua pelo caminho da página de adicionar disciplina
  };

  return (
    <BaseLayout>
      <div className="page-container">
      <h2>Página de Disciplinas</h2>
      <p>Gerencie as disciplinas do sistema aqui.</p>
      <button onClick={handleAddSubject}>Adicionar Nova Disciplina</button>
      {/* Adicione mais conteúdo e componentes específicos para disciplinas */}
    </div>
    </BaseLayout>
  );
};

export default SubjectsPage;
