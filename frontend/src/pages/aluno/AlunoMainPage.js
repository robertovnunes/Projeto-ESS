// src/pages/StudentPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/OpcoesButton.css';
import '../../style/container.css';

const StudentPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="student-page">
      <div className="content-container">
        <h2>Bem-vindo, Aluno!</h2>
        <div className="button-container">
          <button className="button" onClick={() => handleNavigation('/aluno/comentario')}>
            Criar Comentário
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
