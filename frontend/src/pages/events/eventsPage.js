import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import BaseLayout from '../../components/common/BaseLayout';

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
    navigate('/mainpage'); // Navegar para a página anterior
  };

  return (
    <BaseLayout>
        <div className="page-container">
            <div className="content-container">
                <html>
                <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
                </head>
                <body>
                    <button className="back-button" onClick={handleGoBack}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <h1>Eventos</h1>
                    <div className="button-group">
                    {userType === 'professor' || userType === 'admin' ? (
                        <>
                        <button className="group-button" onClick={handleCreateEventClick}>
                            Cadastrar Novo Evento
                        </button>
                        <button className="group-button" onClick={handleEditEventClick}>
                            Editar Evento Existente
                        </button>
                        </>
                    ) : null}
                    <button className="group-button" onClick={handleViewEventsClick}>
                        Ver Eventos
                    </button>
                    </div>
            
            </body>
            </html>
        </div>
    </div>
        
    </BaseLayout>

  );
};

export default EventsPage;