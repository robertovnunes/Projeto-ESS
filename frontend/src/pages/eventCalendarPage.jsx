import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import '../styles/eventCalendarPage.css';

const EventCalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

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
      const formattedDate = date.toISOString().split('T')[0];
      const dayEvents = events.filter(event => event.eventDateAndTime.startsWith(formattedDate));

      return (
        <>
          {dayEvents.map(event => (
            <div key={event.id} className="calendar-event">
              {event.eventName}
            </div>
          ))}
        </>
      );
    }
  };

  return (
    <div className="calendar-page-container">
      <h1>Calendário de Eventos</h1>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent}
      />
    </div>
  );
};

export default EventCalendarPage;
