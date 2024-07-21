import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/disciplinesPage.css';

const DisciplinePage = () => {
  const navigate = useNavigate();

  const handleCreateDisciplineClick = () => {
    navigate('/create-discipline');
  };

  const handleEditDisciplineClick = () => {
    navigate('/disciplines-list');
  };

  const handleViewDisciplinesClick = () => {
    navigate('/calendar-disciplines');
  };

  return (
    <div className="discipline-page-container">
      <h1>Disciplinas</h1>
      <div className="button-group">
        <button className="discipline-button" onClick={handleCreateDisciplineClick}>Cadastrar Nova Disciplina</button>
        <button className="discipline-button" onClick={handleEditDisciplineClick}>Editar Disciplina Existente</button>
        <button className="discipline-button" onClick={handleViewDisciplinesClick}>Ver Disciplinas</button>
      </div>
    </div>
  );
};

export default DisciplinePage;
