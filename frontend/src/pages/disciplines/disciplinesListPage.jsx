import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookie from 'js-cookie';
import '../../style/disciplines/disciplineListPage.css';
//import NavUserBar from '../../components/common/NavUserBar';

import BaseLayout from '../../components/common/BaseLayout';

const DisciplineListPage = () => {
  const [disciplines, setDisciplines] = useState([]);
  const navigate = useNavigate();
  const userType = Cookie.get('userType') || 'Desconhecido';

  useEffect(() => {
    if (userType !== 'professor' && userType !== 'admin') {
      navigate('/mainpage');
    }
  }, [navigate, userType]);

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

  const handleEdit = (id) => {
    navigate(`/edit-discipline/${id}`);
  };

  const handleGoBack = () => {
    navigate('/disciplines'); // Navegar para a página anterior
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/disciplines/${id}`);
      setDisciplines(disciplines.filter(discipline => discipline.disciplineID !== id));
    } catch (error) {
      console.error('Erro ao deletar disciplina:', error);
    }
  };

  return (
    <BaseLayout>
    <div className="content-container">
        <html>
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
            </head>
            <body>
                <button className="back-button" onClick={handleGoBack}>
                    <i className="fas fa-arrow-left"></i>
                </button>
                <h1>Disciplinas</h1>
                <ul className="discipline-list">
                    {disciplines.map(discipline => (
                    <li key={discipline.disciplineID} className="discipline-item">
                        <span>{discipline.nome}</span>
                        <div className="discipline-actions">
                        <button onClick={() => handleEdit(discipline.disciplineID)} className="edit-button-event"><i className="fas fa-edit"></i></button>
                        <button onClick={() => handleDelete(discipline.disciplineID)} className="delete-button-event"><i className="fas fa-trash"></i></button>
                        </div>
                    </li>
                    ))}
                </ul>
            </body>
        </html>
    </div>
    </BaseLayout>
  );
};

export default DisciplineListPage;