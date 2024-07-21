import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import BaseLayout from '../../components/common/BaseLayout';
import Modal from '../../components/common/simNao_Modal'; // Importe o componente Modal
import '../../style/lista_usuarios.css';
import '../../style/container.css';
import '../../style/adicionar_usuario.css';
import '../../style/icons.css';
import { fetchAlunos, deleteUsuario } from '../../context/usuarios/alunos/apiService';

const AlunosPage = () => {
  const [alunos, setAlunos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Estado para controle do modal de confirmação
  const [alunoToDelete, setAlunoToDelete] = useState(null); // Estado para armazenar o aluno a ser deletado
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getAlunos = async () => {
      try {
        const data = await fetchAlunos();
        setAlunos(data);
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    getAlunos();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddAlunoClick = () => {
    navigate('/usuarios/alunos/adicionar');
  };

  const handleEditAluno = (login) => {
    // Navegue para a página de edição do aluno com o login especificado
  };

  const handleDeleteAluno = (login) => {
    setAlunoToDelete(login); // Armazena o aluno a ser deletado e exibe o modal
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (alunoToDelete) {
        await deleteUsuario("alunos", alunoToDelete); // Chamar a função de exclusão do backend
        const updatedAlunos = alunos.filter(aluno => aluno.login !== alunoToDelete);
        setAlunos(updatedAlunos);
        setAlunoToDelete(null); // Limpar o aluno selecionado
      }
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);
    } finally {
      setShowConfirmModal(false); // Fechar o modal de confirmação
    }
  };

  const cancelDelete = () => {
    setAlunoToDelete(null); // Limpar o aluno selecionado
    setShowConfirmModal(false); // Fechar o modal de confirmação
  };

  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate('/usuarios');
    }
  };

  return (
    <BaseLayout>
      <div className="page-container">
        <div className="content-container">
          <div className="header-container">
            <button className="back-button" onClick={handleGoBack}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h2>Página de Alunos</h2>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar aluno..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
          <div className="usuarios-list">
            <div className="list-header">
              <span className="header-item nome-header">Nome</span>
              <span className="header-item login-header">Login</span>
              <span className="header-item acoes-header">Ações</span>
            </div>
            {alunos
              .filter(aluno =>
                aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(aluno => (
                <div key={aluno.login} className="usuario-item">
                  <span className="usuario-name">{aluno.nome}</span>
                  <span className="usuario-login">{aluno.login}</span>
                  <div className="usuario-actions">
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="usuario-action-icon edit-icon"
                      onClick={() => handleEditAluno(aluno.login)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="usuario-action-icon delete-icon"
                      onClick={() => handleDeleteAluno(aluno.login)}
                    />
                  </div>
                </div>
              ))}
          </div>
          <button className="button add-usuario-button" onClick={handleAddAlunoClick}>
            Adicionar Aluno
          </button>
          {showConfirmModal && (
            <Modal
              message={`Tem certeza de que deseja deletar o aluno com login ${alunoToDelete}?`}
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default AlunosPage;
