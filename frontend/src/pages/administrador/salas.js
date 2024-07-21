// src/pages/RoomsPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/admin/salas.css'; 
import BaseLayout from '../../components/common/BaseLayout';

const RoomsPage = () => {
  const navigate = useNavigate();

  const handleAddRoom = () => {
    navigate('/adicionar-sala'); 
  };

  return (
    <BaseLayout>
        <div className="page-container">
      <h2>Página de Salas</h2>
      <p>Gerencie as salas do sistema aqui.</p>
      <button onClick={handleAddRoom}>Adicionar Nova Sala</button>
      {/* Adicione mais conteúdo e componentes específicos para salas */}
    </div>
    </BaseLayout>
  );
};

export default RoomsPage;
