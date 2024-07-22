import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../style/disciplines/disciplineViewPage.css';
import logo from '../../assets/CIn_logo.png';

const DisciplineViewPage = () => {
  const [disciplines, setDisciplines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const response = await axios.get('http://localhost:3001/disciplines/getAll');
        setDisciplines(response.data);
      } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);
      }
    };

    fetchDisciplines();
  }, []);


  const handleViewRooms = (id) => {
    navigate(`/discipline-rooms/${id}`);
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
        <div className="discipline-list-container">
          <button className="back-button" onClick={handleGoBack}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1>Disciplinas</h1>
          <ul className="discipline-list">
            {disciplines.map(discipline => (
              <li key={discipline.disciplineID} className="discipline-item">
                <span>{discipline.nome}</span>
                <div className="discipline-actions">
                  <button onClick={() => handleViewRooms(discipline.disciplineID)} className="view-rooms-button"><i className="fas fa-door-open"></i> Ver Salas</button>
                 
                </div>
              </li>
            ))}
          </ul>
        </div>
      </body>
    </html>
  );
};

export default DisciplineViewPage;
