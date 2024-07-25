// src/pages/EventsPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/admin/eventos.css'; // Adicione o CSS correspondente
import BaseLayout from '../../components/common/BaseLayout';

const EventsPage = () => {
  const navigate = useNavigate();

  const handleAddEvent = () => {
    navigate('/adicionar-evento'); // Substitua pelo caminho da página de adicionar evento
  };

  return (
    <BaseLayout>
      <div className="page-container">
      <h2>Página de Eventos</h2>
      <p>Gerencie os eventos do sistema aqui.</p>
      <button onClick={handleAddEvent}>Adicionar Novo Evento</button>
      {/* Adicione mais conteúdo e componentes específicos para eventos */}
    </div>
    </BaseLayout>
  );
};

export default EventsPage;
