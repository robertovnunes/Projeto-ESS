// src/pages/EquipmentPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/admin/equipamentos.css'; // Adicione o CSS correspondente
import BaseLayout from '../../components/common/BaseLayout';
import MainEquipments from '../../pages/equipamentos/Main'; // Importe o componente MainEquipments

const EquipmentPage = () => {
  const navigate = useNavigate();

  const handleAddEquipment = () => {
    navigate('/adicionar-equipamento'); // Substitua pelo caminho da página de adicionar equipamento
  };

  return (
    <BaseLayout>
      <div className="page-container">
        <MainEquipments role={'admin'}/>
      </div>
    </BaseLayout>
  );
};

export default EquipmentPage;
