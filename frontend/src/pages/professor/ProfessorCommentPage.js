import React, { useState } from 'react';

const ProfessorCommentPage = () => {
  const [comment, setComment] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleCommentSubmit = () => {
    // Lógica para enviar o comentário
    console.log('Comentário enviado:', { recipient, comment });
  };

  return (
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
    </div>
  );
};

export default ProfessorCommentPage;
