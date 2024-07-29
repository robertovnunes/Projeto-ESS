import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../style/disciplines/disciplineViewPage.css';
//import NavUserBar from '../../components/common/NavUserBar';

import BaseLayout from '../../components/common/BaseLayout';

const DisciplineViewPage = () => {
  const [disciplines, setDisciplines] = useState([]);
  const navigate = useNavigate();

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


  const handleViewRooms = (id) => {
    navigate(`/discipline-rooms/${id}`);
  };

  const handleGoBack = () => {
    navigate('/disciplines'); // Navegar para a página anterior
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
            <h2>Visualizar Salas das Disciplinas</h2>
            <ul className="discipline-list">
                {disciplines.map(discipline => (
                <li key={discipline.disciplineID} className="discipline-item">
                    <span>{discipline.nome}</span>
                    <div className="discipline-actions">
                    <button onClick={() => handleViewRooms(discipline.disciplineID)} className="view-rooms-button"><i className="fas fa-door-open"></i> Ver Salas</button>

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

export default DisciplineViewPage;