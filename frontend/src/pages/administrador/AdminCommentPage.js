import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/OpcoesButton.css';
import '../../style/container.css';

import BaseLayout from '../../components/common/BaseLayout';

const AdminCommentPage = () => {
  const [comentarios, setComentarios] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedComment, setSelectedComment] = useState(null);
  const [resposta, setResposta] = useState('');

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await axios.get('/comentarios');
        setComentarios(response.data);
      } catch (error) {
        setError('Erro ao carregar comentários.');
      }
    };

    fetchComentarios();
  }, []);

  const handleValidate = async (id) => {
    try {
      await axios.patch(`/comentarios/${id}/validar`);
      setComentarios((prevComentarios) =>
        prevComentarios.map((comentario) =>
          comentario.id === id ? { ...comentario, validado: true } : comentario
        )
      );
      setSuccessMessage('Comentário validado.');
    } catch (error) {
      setError('Erro ao validar comentário.');
    }
  };

  const handleOpenResponse = (comentario) => {console.log('Comentário encontrado:', comentario);
    if (!comentario.validado) {
      setError('ERRO, o comentário não pode ser respondido antes de ser validado.');
    } else {
      setSelectedComment(comentario);
    }
  };

  const handleCloseResponse = () => {
    setSelectedComment(null);
    setResposta('');
  };

  const handleSendResponse = async () => {
    try {
      await axios.patch(`/comentarios/${selectedComment.id}/responder`, { resposta });
      setComentarios((prevComentarios) =>
        prevComentarios.map((comentario) =>
          comentario.id === selectedComment.id ? { ...comentario, resposta } : comentario
        )
      );
      setSuccessMessage('Resposta enviada.');
      handleCloseResponse();
    } catch (error) {
      setError('Erro ao enviar resposta.');
    }
  };

  return (
    <BaseLayout>
      <div className="admin-page">
            <h2>Comentários</h2>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <table className="comments-table">
              <thead>
                <tr>
                  <th>Destinatário</th>
                  <th>Autor</th>
                  <th>Texto</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {comentarios.map((comentario) => (
                  <tr key={comentario.id}>
                    <td>{comentario.destinatario}</td>
                    <td>{comentario.autor}</td>
                    <td>{comentario.texto}</td>
                    <td>
                      <button className="button" onClick={() => handleValidate(comentario.id)}>
                        Validar
                      </button>
                      <button className="button" onClick={() => handleOpenResponse(comentario)}>
                        Responder
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedComment && (
              <div className="response-popup">
                <div className="response-content">
                  <h3>Responder Comentário</h3>
                  <p>
                    <strong>Autor:</strong> {selectedComment.autor}
                  </p>
                  <p>
                    <strong>Texto:</strong> {selectedComment.texto}
                  </p>
                  <textarea
                    value={resposta}
                    onChange={(e) => setResposta(e.target.value)}
                    placeholder="Escreva sua resposta aqui..."
                  />
                  <button className="button" onClick={handleSendResponse}>
                    Enviar
                  </button>
                  <button className="button" onClick={handleCloseResponse}>
                    Cancelar
                  </button>
                </div>
              </div>
            )}
      </div>
    </BaseLayout>
  );
};

export default AdminCommentPage;
