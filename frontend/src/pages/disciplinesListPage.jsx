import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/disciplineListPage.css';

const DisciplineListPage = () => {
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

  const handleEdit = (id) => {
    navigate(`/edit-discipline/${id}`);
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
    <div className="discipline-list-container">
      <h1>Disciplinas</h1>
      <ul className="discipline-list">
        {disciplines.map(discipline => (
          <li key={discipline.disciplineID} className="discipline-item">
            <span>{discipline.nome}</span>
            <div className="discipline-actions">
              <button onClick={() => handleEdit(discipline.disciplineID)} className="edit-button">Editar</button>
              <button onClick={() => handleDelete(discipline.disciplineID)} className="delete-button">Deletar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisciplineListPage;
