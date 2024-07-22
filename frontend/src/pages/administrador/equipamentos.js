// src/pages/EquipmentPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/admin/equipamentos.css'; // Adicione o CSS correspondente
import BaseLayout from '../../components/common/BaseLayout';

const EquipmentPage = () => {
  const navigate = useNavigate();

  const handleAddEquipment = () => {
    navigate('/adicionar-equipamento'); // Substitua pelo caminho da página de adicionar equipamento
  };

  return (
    <BaseLayout>
      <div className="page-container">
        <h2>Página de Equipamentos</h2>
        <p>Gerencie os equipamentos do sistema aqui.</p>
        <button onClick={handleAddEquipment}>Adicionar Novo Equipamento</button>
        {/* Adicione mais conteúdo e componentes específicos para equipamentos */}
      </div>
    </BaseLayout>
  );
};

export default EquipmentPage;
