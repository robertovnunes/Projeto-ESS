import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { format, parseISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/disciplineEditPage.css';
import logo from '../assets/CIn_logo.png';
import { MdDateRange } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineEventNote } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";

const DisciplineEditPage = () => {
  const { id } = useParams();
  const [nome, setNome] = useState('');
  const [disciplineID, setDisciplineID] = useState('');
  const [responsibleTeacher, setResponsibleTeacher] = useState('');
  const [horario, setHorario] = useState(new Date());
  const [description, setDescription] = useState('');
  const [disciplineCurso, setDisciplineCurso] = useState('');
  const [disciplinePeriodo, setDisciplinePeriodo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiscipline = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/disciplines/${id}`);
        const discipline = response.data;
        setNome(discipline.nome);
        setDisciplineID(discipline.disciplineID);
        setResponsibleTeacher(discipline.responsibleTeacher);
        setHorario(parseISO(discipline.horario));
        setDescription(discipline.description);
        setDisciplineCurso(discipline.disciplineCurso);
        setDisciplinePeriodo(discipline.disciplinePeriodo);
      } catch (error) {
        console.error('Erro ao buscar disciplina:', error);
      }
    };

    fetchDiscipline();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = format(horario, 'dd-MM-yyyy hh:mm a');

    const disciplineData = {
      nome,
      disciplineID,
      responsibleTeacher,
      horario: formattedDate,
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
    navigate('/disciplines-list'); // Navegar para a página anterior
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
        <i class="fa fa-address-card icon-color" aria-hidden="true"></i>
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
          <label htmlFor="horario">Horário</label>
          <DatePicker
            selected={horario}
            onChange={(date) => setHorario(date)}
            showTimeSelect
            dateFormat="dd-MM-yyyy hh:mm aa"
            className="form-input"
          />
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
        <i class="fa fa-graduation-cap icon-color" aria-hidden="true"></i>
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
        <i class="fa fa-book icon-color" aria-hidden="true"></i>
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
