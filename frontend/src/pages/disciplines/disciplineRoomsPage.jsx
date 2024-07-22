import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/CIn_logo.png';
import '../../style/disciplines/disciplineRoomsPage.css';

const DisciplineRoomsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [salas, setSalas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDiscipline = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/disciplines/${id}`);
        setSalas(response.data || []);
      } catch (error) {
        console.error('Erro ao buscar disciplina:', error);
        setError('Erro ao buscar disciplina ou disciplina não encontrada.');
      }
    };

    fetchDiscipline();
  }, [id]);

  const handleGoBack = () => {
    navigate('/disciplines'); // Navegar para a página anterior
  };

  return (
    <html>
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
    </head>
    <div className="discipline-rooms-page">
      <nav className="navbar">
        <div className="navbar-content">
          <img src={logo} alt="Logo" className="logo-image" />
          <span className="website-name">Reservas CIn</span>
          <ul className="navbar-list">
            <li className="navbar-item"><a href="#home" className="navbar-link"><i className="fas fa-home"></i> Home</a></li>
            <li className="navbar-item"><a href="#services" className="navbar-link"><i className="fas fa-user"></i> Perfil</a></li>
            <li className="navbar-item"><a href="/disciplines" className="navbar-link"><i className="fas fa-book"></i> Disciplinas</a></li>
            <li className="navbar-item"><a href="/events" className="navbar-link"><i className="fas fa-calendar"></i> Eventos</a></li>
          </ul>
        </div>
      </nav>

      <div className="discipline-room-container">
      <button className="back-button" onClick={handleGoBack}>
            <i className="fas fa-arrow-left"></i>
        </button>
        <h1>Salas Reservadas</h1>
        {error ? (
          <p>{error}</p>
        ) : salas.length > 0 ? (
          <ul>
            {salas.map((sala, index) => (
              <div className="room">
              <li key={index}>{sala}</li>
              </div>
            ))}
          </ul>
        ) : (
        
          <div className="no-rooms">
            <div className = "icon-circle">
            <i class="fa fa-times-circle" aria-hidden="true"></i>
            </div>
            <p>Nenhuma sala reservada.</p>
          </div>
        )}
      </div>
    </div>
    </html>

  );
};

export default DisciplineRoomsPage;
