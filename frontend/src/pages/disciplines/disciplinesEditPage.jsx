import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { format, parseISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import '../../style/disciplines/disciplineEditPage.css';
import NavUserBar from '../../components/common/NavUserBar';
import Cookie from 'js-cookie';
import { MdDateRange } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineEventNote } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";

const daysOfWeekMap = {
  'DOM': 'SUN',
  'SEG': 'MON',
  'TER': 'TUE',
  'QUA': 'WED',
  'QUI': 'THU',
  'SEX': 'FRI',
  'SAB': 'SAT'
};

const DisciplineEditPage = () => {
  const { id } = useParams();
  const [nome, setNome] = useState('');
  const [disciplineID, setDisciplineID] = useState('');
  const [responsibleTeacher, setResponsibleTeacher] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState([]);
  const [description, setDescription] = useState('');
  const [disciplineCurso, setDisciplineCurso] = useState('');
  const [disciplinePeriodo, setDisciplinePeriodo] = useState('');
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
    const fetchDiscipline = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/disciplines/${id}`);
        const discipline = response.data;
        setNome(discipline.nome);
        setDisciplineID(discipline.disciplineID);
        setResponsibleTeacher(discipline.responsibleTeacher);

        const [start, , end, time, ...days] = discipline.horario.split(' ');
        setStartDate(parseISO(start.replace(/\//g, '-')));
        setEndDate(parseISO(end.replace(/\//g, '-')));
        setTime(parseISO(time));

        const selectedDaysFromServer = days.map(day => Object.keys(daysOfWeekMap).find(key => daysOfWeekMap[key] === day));
        setSelectedDays(selectedDaysFromServer);

        setDescription(discipline.description);
        setDisciplineCurso(discipline.disciplineCurso);
        setDisciplinePeriodo(discipline.disciplinePeriodo);
      } catch (error) {
        console.error('Erro ao buscar disciplina:', error);
      }
    };

    fetchDiscipline();
  }, [id]);

  const handleDayChange = (day) => {
    setSelectedDays(prevSelectedDays =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter(d => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedStartDate = format(startDate, 'dd/MM/yyyy');
    const formattedEndDate = format(endDate, 'dd/MM/yyyy');
    const formattedTime = format(time, 'hh:mm aa');
    const daysString = selectedDays.map(day => daysOfWeekMap[day]).join(' ');

    const horario = `${formattedStartDate} a ${formattedEndDate} ${formattedTime} ${daysString}`;

    const disciplineData = {
      nome,
      disciplineID,
      responsibleTeacher,
      horario,
      description,
      disciplineCurso,
      disciplinePeriodo
    };

    try {
      const response = await axios.put(`http://localhost:3001/disciplines/${id}`, disciplineData);

      if (response.status === 200) {
        setSuccessMessage('Disciplina atualizada com sucesso!');
        setTimeout(() => navigate('/disciplines'), 2000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Erro ao atualizar disciplina');
    }
  };

  const handleGoBack = () => {
    navigate('/disciplines-list');
  };

  return (
    <html>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
      </head>
      <body>
        <NavUserBar />
        <div className="discipline-form-container">
          <button className="back-button" onClick={handleGoBack}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1>Editar Disciplina</h1>
          <form onSubmit={handleSubmit} className="discipline-form">
            <div className="form-group">
              <MdOutlineEventNote className="form-icon" />
              <label htmlFor="nome">Nome da Disciplina</label>
              <input 
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <i className="fa fa-address-card icon-color" aria-hidden="true"></i>
              <label htmlFor="disciplineID">ID da Disciplina</label>
              <input 
                type="text"
                id="disciplineID"
                value={disciplineID}
                onChange={(e) => setDisciplineID(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <FaChalkboardTeacher className="form-icon" />
              <label htmlFor="responsibleTeacher">Professor Responsável</label>
              <input 
                type="text"
                id="responsibleTeacher"
                value={responsibleTeacher}
                onChange={(e) => setResponsibleTeacher(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <MdDateRange className="form-icon" />
              <label htmlFor="startDate">Data de Início</label>
              <DatePicker
                selected={startDate}
                id = "startDate"
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <MdDateRange className="form-icon" />
              <label htmlFor="endDate">Data de Término</label>
              <DatePicker
                selected={endDate}
                id = "endDate"
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <i className="fa fa-bell icon-color" aria-hidden="true"></i>
              <label htmlFor="time">Hora</label>
              <DatePicker
                selected={time}
                id = "time"
                onChange={(date) => setTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Hora"
                dateFormat="hh:mm aa"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <i className="fa fa-bell icon-color" aria-hidden="true"></i>
              <label>Dias da Semana</label>
              <div className="days-checkboxes">
                {Object.keys(daysOfWeekMap).map(day => (
                  <div key={day}>
                    <input 
                      type="checkbox"
                      id={day}
                      value={day}
                      onChange={() => handleDayChange(day)}
                      checked={selectedDays.includes(day)}
                    />
                    <label htmlFor={day}>{day}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
              <MdDriveFileRenameOutline className="form-icon" />
              <label htmlFor="description">Descrição</label>
              <input 
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <i className="fa fa-graduation-cap icon-color" aria-hidden="true"></i>
              <label htmlFor="disciplineCurso">Curso da Disciplina</label>
              <input 
                type="text"
                id="disciplineCurso"
                value={disciplineCurso}
                onChange={(e) => setDisciplineCurso(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <i className="fa fa-book icon-color" aria-hidden="true"></i>
              <label htmlFor="disciplinePeriodo">Período da Disciplina</label>
              <input 
                type="text"
                id="disciplinePeriodo"
                value={disciplinePeriodo}
                onChange={(e) => setDisciplinePeriodo(e.target.value)}
                className="form-input"
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <button type="submit" className="submit-button-event">Salvar</button>
          </form>
        </div>
      </body>
    </html>
  );
};

export default DisciplineEditPage;
