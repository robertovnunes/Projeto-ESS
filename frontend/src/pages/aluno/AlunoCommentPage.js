/*

import React, { useState } from 'react';

const AlunoCommentPage = () => {
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
    <div className="aluno-comment-page">
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

export default AlunoCommentPage;

*/

import React, { useState } from 'react';
import axios from 'axios';

const AlunoCommentPage = () => {
  const [comment, setComment] = useState('');
  const [recipient, setRecipient] = useState('');
  const [secResponsavel, setSecResponsavel] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleSecResponsavelChange = (event) => {
    setSecResponsavel(event.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post('/api/comentarios', {
        autor: 'aluno',
        login: 'tns',
        comentario: comment,
        destinatario: recipient,
        sec_responsavel: secResponsavel
      });
      
      if (response.status === 200) {
        setSuccessMessage('Comentário adicionado com sucesso');
      } else {
        setSuccessMessage('Erro ao adicionar comentário');
      }
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
      setSuccessMessage('Erro ao adicionar comentário');
    }
  };

  return (
    <div className="aluno-comment-page">
      <h2>Escrever Comentário</h2>
      <input 
        type="text" 
        value={recipient} 
        onChange={handleRecipientChange} 
        placeholder="Digite o destinatário aqui" 
      />
      <input 
        type="text" 
        value={secResponsavel} 
        onChange={handleSecResponsavelChange} 
        placeholder="Digite a secretaria responsável aqui" 
      />
      <textarea 
        value={comment} 
        onChange={handleCommentChange} 
        placeholder="Digite seu comentário aqui" 
      />
      <button onClick={handleCommentSubmit}>Enviar Comentário</button>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default AlunoCommentPage;
