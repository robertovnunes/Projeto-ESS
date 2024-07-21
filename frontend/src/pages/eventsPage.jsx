import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/eventsPage.css';


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
    navigate('/events-list');
    // Navegar para a página de ver eventos
  };

  return (
    <div className="events-page-container">
      <h1>Eventos</h1>
      <div className="button-group">
        <button className="event-button" onClick={handleCreateEventClick}>Cadastrar Novo Evento</button>
        <button className="event-button" onClick={handleEditEventClick}>Editar Evento Existente</button>
        <button className="event-button" onClick={handleViewEventsClick}>Ver Eventos</button>
      </div>
    </div>
  );
};

export default EventsPage;