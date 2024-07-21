import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import BaseLayout from '../../components/common/BaseLayout';
import { addAluno } from '../../context/usuarios/alunos/apiService'; // Importe a função de requisição
import Modal from '../../components/common/Modal'; // Importe o componente Modal
import '../../style/conteiner.css'

const AddAlunoPage = () => {
  const [newAluno, setNewAluno] = useState({ nome: '', login: '', senha: '' });
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAluno({ ...newAluno, [name]: value });
  };

  const handleAddAluno = async () => {
    try {
      await addAluno(newAluno); // Enviando dados para o backend
      setMessage('Cadastro realizado com sucesso');
      setShowModal(true); // Mostrar o modal
      setNewAluno({ nome: '', login: '', senha: '' }); // Limpar os campos do formulário
    } catch (error) {
      // Verificar se o erro tem uma resposta e se contém uma mensagem
      const errorMessage = error.response?.data?.message || 'Erro ao adicionar aluno';
      setMessage(errorMessage); // Mostrar a mensagem do erro retornado pela API
      setShowModal(true); // Mostrar o modal
      console.error('Erro ao adicionar aluno:', error);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navegar para a página anterior
  };

  const handleCloseModal = () => {
    setShowModal(false); // Fechar o modal
  };

  return (
    <BaseLayout>
      <div className="page-container">
        <div className="content-container">
          <div className="header-container">
            <button className="back-button" onClick={handleGoBack}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h2>Adicionar Aluno</h2>
          </div>
          <div className="add-aluno-form">
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={newAluno.nome}
              onChange={handleInputChange}
              className="form-input"
            />
            <input
              type="text"
              name="login"
              placeholder="Login"
              value={newAluno.login}
              onChange={handleInputChange}
              className="form-input"
            />
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={newAluno.senha}
              onChange={handleInputChange}
              className="form-input"
            />
            <button className="add-usuario-button" onClick={handleAddAluno}>
              Adicionar
            </button>
          </div>
          {showModal && (
            <Modal
              message={message}
              onClose={handleCloseModal}
            />
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default AddAlunoPage;
