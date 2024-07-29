import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
//import NavUserBar from '../../components/common/NavUserBar';
//import '../../style/disciplines/disciplineRoomsPage.css';
import BaseLayout from '../../components/common/BaseLayout';
const DisciplineRoomsPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [salas, setSalas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDiscipline = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/disciplines/${id}`);
        setSalas(response.data || []);
      } catch (error) {
        console.error('Erro ao buscar disciplina:', error);
        setError('Erro ao buscar disciplina ou disciplina não encontrada.');
      }
    };

    fetchDiscipline();
  }, [id]);

  const handleGoBack = () => {
    navigate('/discipline-view'); // Navegar para a página anterior
  };

  return (
    <BaseLayout>

    
    <html>
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
    </head>
    

      <div className="content-container">
      <button className="back-button" onClick={handleGoBack}>
            <i className="fas fa-arrow-left"></i>
        </button>
        <h2>Salas Reservadas</h2>
        {error ? (
          <p>{error}</p>
        ) : salas.length > 0 ? (
          <ul>
            {salas.map((sala, index) => (
              <div className="room">
              <li key={index}>{sala}</li>
              </div>
            ))}
          </ul>
        ) : (

          <div className="no-rooms">
            <div className = "icon-circle">
            <i class="fa fa-times-circle icon-color" aria-hidden="true"></i>
            </div>
            <p>Nenhuma sala reservada.</p>
          </div>
        )}
      </div>
   
    </html>
    
    
    </BaseLayout>
    

  );
};

export default DisciplineRoomsPage;