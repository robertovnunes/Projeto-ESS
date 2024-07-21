import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { format, parseISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/eventEditPage.css';

const EventEditPage = () => {
  const { id } = useParams();
  const [eventName, setEventName] = useState('');
  const [eventDateAndTime, setEventDateAndTime] = useState(new Date());
  const [description, setDescription] = useState('');
  const [responsibleTeacher, setResponsibleTeacher] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/events/${id}`);
        const event = response.data;
        setEventName(event.eventName);
        setEventDateAndTime(parseISO(event.eventDateAndTime));
        setDescription(event.description);
        setResponsibleTeacher(event.responsibleTeacher);
      } catch (error) {
        console.error('Erro ao buscar evento:', error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = format(eventDateAndTime, 'dd-MM-yyyy hh:mm a');

    const eventData = {
      eventName,
      description,
      responsibleTeacher,
      eventDateAndTime: formattedDate
    };

    try {
      const response = await axios.put(`http://localhost:3001/events/${id}`, eventData);

      if (response.status === 200) {
        setSuccessMessage('Evento atualizado com sucesso!');
        setTimeout(() => navigate('/events'), 2000);
      }
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
      setErrorMessage(error.response?.data?.error || 'Erro ao atualizar evento');
    }
  };

  return (
    <div className="event-edit-container">
      <h1>Editar Evento</h1>
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label htmlFor="eventName">Nome do Evento</label>
          <input 
            type="text" 
            id="eventName"
            name="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required 
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <input 
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="responsibleTeacher">Professor Responsável</label>
          <input 
            type="text"
            id="responsibleTeacher"
            name="responsibleTeacher"
            value={responsibleTeacher}
            onChange={(e) => setResponsibleTeacher(e.target.value)}
            required 
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventDateAndTime">Data e Hora</label>
          <DatePicker
            selected={eventDateAndTime}
            onChange={(date) => setEventDateAndTime(date)}
            showTimeSelect
            timeFormat="hh:mm aa"
            timeIntervals={15}
            dateFormat="dd-MM-yyyy hh:mm aa"
            className="form-input"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit" className="submit-button">Salvar</button>
      </form>
    </div>
  );
};

export default EventEditPage;
