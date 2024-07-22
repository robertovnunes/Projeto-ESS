import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { parse, format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import '../../style/events/eventCalendarPage.css';
import logo from '../../assets/CIn_logo.png';

const parseDate = (dateString) => {
  return parse(dateString, 'dd-MM-yyyy', new Date(), { locale: ptBR });
};

const EventCalendarPage = () => {
  const [date, setDate] = useState(new Date());
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

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayEvents = events.filter(event => {
        const eventDate = parseDate(event.eventDateAndTime.split(' ')[0]);
        return isSameDay(eventDate, date);
      });

      return (
        <>
          {dayEvents.map(event => (
            <div
              key={event.id}
              className="calendar-event"
              onClick={() => handleEventClick(event)}
            >
              {event.eventName}
            </div>
          ))}
        </>
      );
    }
  };

  const handleGoBack = () => {
    navigate('/events'); // Navigate to the previous page
  };

  const handleEventClick = (event) => {
    const time = event.eventDateAndTime.split(' ')[1] + ' ' + event.eventDateAndTime.split(' ')[2];
    alert(`Horário do evento "${event.eventName}": ${time}`);
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
    <div className="calendar-page-container">
    <button className="back-button" onClick={handleGoBack}>
        <i className="fas fa-arrow-left"></i>
      </button>
      <h1>Calendário de Eventos</h1>
      
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent}
      />
    </div>
    </body>
    </html>
  );
};

export default EventCalendarPage;
