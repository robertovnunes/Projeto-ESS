import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookie from 'js-cookie';
import BaseLayout from '../../components/common/BaseLayout';

const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const userType = Cookie.get('userType') || 'Desconhecido';

  useEffect(() => {
    if (userType !== 'professor' && userType !== 'admin') {
      navigate('/mainpage');
    }
  }, [navigate, userType]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-event/${id}`);
  };

  const handleGoBack = () => {
    navigate('/events'); // Navegar para a página anterior
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/events/${id}`);
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
    }
  };

  return (
    <BaseLayout>
        <html>
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
        </head>
        <body>
            <div className="content-container">
            <button className="back-button" onClick={handleGoBack}>
                <i className="fas fa-arrow-left"></i>
            </button>
            <h2>Editar/Deletar Eventos</h2>
            <ul className="discipline-list">
                {events.map(event => (
                <li key={event.id} className="discipline-item">
                    <span>{event.eventName}</span>
                    <div className="discipline-actions">
                    <button onClick={() => handleEdit(event.id)} className="edit-button-event"><i className="fas fa-edit"></i></button>
                    <button onClick={() => handleDelete(event.id)} className="delete-button-event"><i className="fas fa-trash"></i></button>
                    </div>
                </li>
                ))}
            </ul>
            </div>
        </body>
        </html>
    </BaseLayout>
  );
};

export default EventListPage;