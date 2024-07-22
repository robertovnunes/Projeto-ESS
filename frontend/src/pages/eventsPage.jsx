import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/eventsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/CIn_logo.png';


const EventsPage = () => {
  const navigate = useNavigate();

  const handleCreateEventClick = () => {
    navigate('/create-event');
  };

  const handleEditEventClick = () => {
    navigate('/events-list');
    // Navegar para a página de editar evento
  };

  const handleViewEventsClick = () => {
    navigate('/calendar-events');
    // Navegar para a página de ver eventos
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
    <div className="events-page-container">
      <button className="back-button" onClick={handleGoBack}>
        <i className="fas fa-arrow-left"></i>
      </button>
      <h1>Eventos</h1>
      <div className="button-group">
        <button className="event-button" onClick={handleCreateEventClick}>Cadastrar Novo Evento</button>
        <button className="event-button" onClick={handleEditEventClick}>Editar Evento Existente</button>
        <button className="event-button" onClick={handleViewEventsClick}>Ver Eventos</button>
      </div>
    </div>
    </body>
    </html>
  );
};

export default EventsPage;