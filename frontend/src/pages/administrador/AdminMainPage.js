import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate do react-router-dom
import '../../style/OpcoesButton.css'; // Importando o CSS
import '../../style/conteiner.css'

const AdminPage = () => {
  const navigate = useNavigate(); // Cria uma instância de navegação

  const handleNavigation = (path) => {
    navigate(path); // Redireciona para o caminho especificado
  };

  return (
    <div className="admin-page">
      <div className="content-container">
      <h2>Bem-vindo, Administrador!</h2>
      <div className="button-container">
        <button className="button" onClick={() => handleNavigation('/usuarios')}>
          Usuários
        </button>
        <button className="button" onClick={() => handleNavigation('/salas')}>
          Salas
        </button>
        <button className="button" onClick={() => handleNavigation('/disciplinas')}>
          Disciplinas
        </button>
        <button className="button" onClick={() => handleNavigation('/equipamentos')}>
          Equipamentos
        </button>
        <button className="button" onClick={() => handleNavigation('/eventos')}>
          Eventos
        </button>
      </div>
    </div>
      </div>
  );
};

export default AdminPage;
