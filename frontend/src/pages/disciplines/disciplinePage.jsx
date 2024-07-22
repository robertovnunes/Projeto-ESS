import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/disciplines/disciplinesPage.css';
import logo from '../../assets/CIn_logo.png';
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
    navigate('/events'); // Navegar para a página anterior
  };

  return (
    <html>
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
    </head>

    <body>
      <nav className="navbar">
        <div className="navbar-content">
            <img src={logo} alt="Logo" className="logo-image"/>
            <span className="website-name">Reservas CIn</span>
            <ul className="navbar-list">
                <li className="navbar-item"><a href="#home" className="navbar-link"><i className="fas fa-home"></i> Home</a></li>
                <li className="navbar-item"><a href="#services" className="navbar-link"><i className="fas fa-user"></i> Perfil</a></li>
                <li className="navbar-item"><a href="/disciplines" className="navbar-link"><i className="fas fa-book"></i> Disciplinas</a></li>
                <li className="navbar-item"><a href="/events" className="navbar-link"><i className="fas fa-calendar"></i> Eventos</a></li>
            </ul>
        </div>
      </nav>

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
