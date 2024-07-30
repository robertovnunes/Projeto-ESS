// src/pages/TeacherPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/OpcoesButton.css';
import '../../style/container.css';

const TeacherPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="teacher-page">
      <div className="content-container">
        <h2>Bem-vindo, Professor!</h2>
        <div className="button-container">
          <button className="button" onClick={() => handleNavigation('/professor/comentario')}>
            Criar Comentário
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherPage;
