import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/eventListPage.css';

const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/events/${id}`);
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
    }
  };

  return (
    <div className="event-list-container">
      <h1>Eventos</h1>
      <ul className="event-list">
        {events.map(event => (
          <li key={event.id} className="event-item">
            <span>{event.eventName}</span>
            <div className="event-actions">
              <button onClick={() => handleEdit(event.id)} className="edit-button">Editar</button>
              <button onClick={() => handleDelete(event.id)} className="delete-button">Deletar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventListPage;
