import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import axios from 'axios';
import '../styles/disciplineCalendarPage.css';

const daysOfWeekMap = {
  'SUN': 0,
  'MON': 1,
  'TUE': 2,
  'WED': 3,
  'THU': 4,
  'FRI': 5,
  'SAT': 6
};

const parseHorario = (horario) => {
  const [dateRange, time, ...days] = horario.split(' ');
  const [startDateStr, endDateStr] = dateRange.split(' a ');
  const startDate = moment(startDateStr, 'DD/MM/YYYY');
  const endDate = moment(endDateStr, 'DD/MM/YYYY');
  const timeParts = time.split(':');
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1].slice(0, 2));
  const period = timeParts[1].slice(3);

  const startHour = period === 'PM' && hours < 12 ? hours + 12 : hours;

  return {
    startDate,
    endDate,
    startTime: moment({ hour: startHour, minute: minutes }),
    endTime: moment({ hour: startHour + 1, minute: minutes }), // Assuming each class is 1 hour long
    days: days.map(day => daysOfWeekMap[day])
  };
};

const getDatesForDiscipline = (horario) => {
  const { startDate, endDate, days } = parseHorario(horario);
  const allDates = [];
  let currentDate = startDate.clone();

  while (currentDate.isSameOrBefore(endDate)) {
    if (days.includes(currentDate.day())) {
      allDates.push(currentDate.clone());
    }
    currentDate.add(1, 'day');
  }

  return allDates;
};

const DisciplineCalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [disciplines, setDisciplines] = useState([]);

  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const response = await axios.get('http://localhost:3001/disciplines/getAll');
        setDisciplines(response.data);
      } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);
      }
    };

    fetchDisciplines();
  }, []);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      const dayDisciplines = disciplines.filter(discipline => {
        const disciplineDates = getDatesForDiscipline(discipline.horario);
        return disciplineDates.some(disciplineDate => disciplineDate.isSame(date, 'day'));
      });

      return (
        <>
          {dayDisciplines.map(discipline => (
            <div key={discipline.disciplineID} className="calendar-discipline">
              {discipline.nome}
            </div>
          ))}
        </>
      );
    }
  };

  return (
    <div className="calendar-page-container">
      <h1>Calendário de Disciplinas</h1>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent}
      />
    </div>
  );
};

export default DisciplineCalendarPage;
