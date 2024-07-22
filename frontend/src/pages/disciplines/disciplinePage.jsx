import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/disciplines/disciplinesPage.css';
import NavBarCin from '../../components/common/NavBarCin';
const DisciplinePage = () => {
  const navigate = useNavigate();
  const handleCreateDisciplineClick = () => {
    navigate('/create-discipline');
  };

  const handleEditDisciplineClick = () => {
    navigate('/disciplines-list');
  };

  const handleViewDisciplinesClick = () => {
    navigate('/discipline-view');
  };
  const handleGoBack = () => {
    navigate('/disciplines'); // Navegar para a página anterior
  };

  return (
    <html>
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
    </head>

    <body>
      <NavBarCin />

      <div className="discipline-page-container">
        <button className="back-button" onClick={handleGoBack}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1>Disciplinas</h1>
        <div className="button-group">
          <button className="discipline-button" onClick={handleCreateDisciplineClick}>Cadastrar Nova Disciplina</button>
          <button className="discipline-button" onClick={handleEditDisciplineClick}>Editar Disciplina Existente</button>
          <button className="discipline-button" onClick={handleViewDisciplinesClick}>Ver Disciplinas</button>
        </div>
      </div>
    </body>
    </html>
  );
};

export default DisciplinePage;
