import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { format, parseISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { MdDateRange } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineEventNote } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Cookie from 'js-cookie';
import BaseLayout from '../../components/common/BaseLayout';

const EventEditPage = () => {
  const { id } = useParams();
  const [eventName, setEventName] = useState('');
  const [originalEventName, setOriginalEventName] = useState('');
  const [eventDateAndTime, setEventDateAndTime] = useState(new Date());
  const [originalEventDateAndTime, setOriginalEventDateAndTime] = useState(new Date());
  const [description, setDescription] = useState('');
  const [originalDescription, setOriginalDescription] = useState('');
  const [responsibleTeacher, setResponsibleTeacher] = useState('');
  const [originalResponsibleTeacher, setOriginalResponsibleTeacher] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const userType = Cookie.get('userType') || 'Desconhecido';

  useEffect(() => {
    if (userType !== 'professor' && userType !== 'admin') {
      navigate('/mainpage');
    }
  }, [navigate, userType]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/events/${id}`);
        const event = response.data;
        setEventName(event.eventName);
        setOriginalEventName(event.eventName);
        setEventDateAndTime(parseISO(event.eventDateAndTime));
        setOriginalEventDateAndTime(parseISO(event.eventDateAndTime));
        setDescription(event.description);
        setOriginalDescription(event.description);
        setResponsibleTeacher(event.responsibleTeacher);
        setOriginalResponsibleTeacher(event.responsibleTeacher);
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
      eventName: eventName || originalEventName,
      description: description || originalDescription,
      responsibleTeacher: responsibleTeacher || originalResponsibleTeacher,
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

  const handleGoBack = () => {
    navigate('/events-list'); // Navegar para a página anterior
  };

  return (
    <BaseLayout>
        <div>
        <div className="content-container">
            <h2>Editar Evento</h2>
            <button className="back-button" onClick={handleGoBack}>
            <i className="fas fa-arrow-left"></i>
            </button>
            <form onSubmit={handleSubmit} className="event-form">
            <div className="form-group">
                <label htmlFor="eventName"><MdOutlineEventNote className="form-icon icon-color" /> Nome do Evento</label>
                <input 
                type="text" 
                id="eventName"
                name="eventName"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="form-input"
                />
            </div>
            <div className="form-group">
                <label htmlFor="description"><i class="fa fa-pencil icon-color" aria-hidden="true"></i> Descrição</label>
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
                <label htmlFor="responsibleTeacher"><i className="fa fa-chalkboard-teacher icon-color" aria-hidden="true"></i> Professor Responsável</label>
                <input 
                type="text"
                id="responsibleTeacher"
                name="responsibleTeacher"
                value={responsibleTeacher}
                onChange={(e) => setResponsibleTeacher(e.target.value)}
                className="form-input"
                />
            </div>
            <div className="form-group">
                <label htmlFor="eventDateAndTime"><i class="fa fa-calendar icon-color" aria-hidden="true"></i> Data e Hora</label>
                <DatePicker 
                id="eventDateAndTime"
                name="eventDateAndTime"
                selected={eventDateAndTime} 
                onChange={date => setEventDateAndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="dd-MM-yyyy hh:mm a"
                timeCaption="time"
                className="form-input datepicker-input"
                />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <button type="submit" className="add-usuario-button">Salvar</button>
            </form>
        </div>
        </div>
    </BaseLayout>
  );
};

export default EventEditPage;