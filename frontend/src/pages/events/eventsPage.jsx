import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import NavBarCin from '../../components/common/NavBarCin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../../style/events/eventsPage.css';

const EventsPage = () => {
  const navigate = useNavigate();
  const userType = Cookie.get('userType') || 'Desconhecido';

  useEffect(() => {
    if (userType === 'Desconhecido') {
      navigate('/login');
    }
  }, [navigate, userType]);

  const handleCreateEventClick = () => {
    navigate('/create-event');
  };

  const handleEditEventClick = () => {
    navigate('/events-list');
  };

  const handleViewEventsClick = () => {
    navigate('/calendar-events');
  };

  const handleGoBack = () => {
    navigate('/events'); // Navegar para a página anterior
  };

  return (
    <div className="events-page">
      <NavBarCin />
      <div className="events-page-container">
        <button className="back-button" onClick={handleGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1>Eventos</h1>
        <div className="button-group">
          {userType === 'professor' || userType === 'admin' ? (
            <>
              <button className="event-button" onClick={handleCreateEventClick}>
                Cadastrar Novo Evento
              </button>
              <button className="event-button" onClick={handleEditEventClick}>
                Editar Evento Existente
              </button>
            </>
          ) : null}
          <button className="event-button" onClick={handleViewEventsClick}>
            Ver Eventos
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
