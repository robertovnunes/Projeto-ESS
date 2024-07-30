import React, { useState } from 'react';
import axios from 'axios';

import BaseLayout from '../../components/common/BaseLayout';

const ProfessorCommentPage = () => {
  const [comment, setComment] = useState('');
  const [recipient, setRecipient] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleCommentSubmit = async () => {

    try {
      const response = await axios.post('/comentarios', {
        autor: 'aluno',
        login: 'tns',
        comentario: comment,
        destinatario: recipient
      });
      
      if (response.status === 201) {
        setSuccessMessage('Comentário adicionado com sucesso');
      } else {
        setSuccessMessage('Erro ao adicionar comentário');
      }
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
      setSuccessMessage('Erro ao adicionar comentário');
    }

    console.log('Comentário enviado:', { recipient, comment });
  };

  return (
    <BaseLayout>
    <div className="content-container">
    <div className="professor-comment-page">
      <h2>Escrever Comentário</h2>
      <input 
        type="text" 
        value={recipient} 
        onChange={handleRecipientChange} 
        placeholder="Digite o destinatário aqui" 
      />
      <textarea 
        value={comment} 
        onChange={handleCommentChange} 
        placeholder="Digite seu comentário aqui" 
      />
      <button onClick={handleCommentSubmit}>Enviar Comentário</button>
      {successMessage && <p>{successMessage}</p>}
    </div>
    </div>
    </BaseLayout>
  );
};

export default ProfessorCommentPage;
