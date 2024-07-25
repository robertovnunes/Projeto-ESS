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
import { fetchUsuarios, deleteUsuario } from '../../context/usuarios/apiService';

const ProfessoresPage = () => {
  const [professores, setProfessores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Estado para controle do modal de confirmação
  const [ProfessorToDelete, setProfessorToDelete] = useState(null); // Estado para armazenar o Professor a ser deletado
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getProfessores = async () => {
      try {
        const data = await fetchUsuarios("professores");
        setProfessores(data);
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    getProfessores();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddProfessorClick = () => {
    navigate('/usuarios/professores/adicionar');
  };

  const handleEditProfessor = (login) => {
    // Navegue para a página de edição do Professor com o login especificado
  };

  const handleDeleteProfessor = (login) => {
    setProfessorToDelete(login); // Armazena o Professor a ser deletado e exibe o modal
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (ProfessorToDelete) {
        await deleteUsuario("Professores", ProfessorToDelete); // Chamar a função de exclusão do backend
        const updatedProfessores = professores.filter(Professor => Professor.login !== ProfessorToDelete);
        setProfessores(updatedProfessores);
        setProfessorToDelete(null); // Limpar o Professor selecionado
      }
    } catch (error) {
      console.error('Erro ao deletar Professor:', error);
    } finally {
      setShowConfirmModal(false); // Fechar o modal de confirmação
    }
  };

  const cancelDelete = () => {
    setProfessorToDelete(null); // Limpar o Professor selecionado
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
            <h2>Página de Professores</h2>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar Professor..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
          <div className="usuarios-list">
            <div className="list-header">
              <span className="header-item nome-header">Nome</span>
              <span className="header-item SIAPE-header">SIAPE</span>
              <span className="header-item login-header">Login</span>
              <span className="header-item acoes-header">Ações</span>
            </div>
            {professores
              .filter(Professor =>
                Professor.nome.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(Professor => (
                <div key={Professor.login} className="usuario-item">
                  <span className="usuario-name">{Professor.nome}</span>
                  <span className="usuario-SIAPE">{Professor.SIAPE}</span>
                  <span className="usuario-login">{Professor.login}</span>
                  <div className="usuario-actions">
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="usuario-action-icon edit-icon"
                      onClick={() => handleEditProfessor(Professor.login)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="usuario-action-icon delete-icon"
                      onClick={() => handleDeleteProfessor(Professor.login)}
                      data-testid={`delete-icon-${Professor.login}`} // Adicionando este atributo
                    />
                  </div>
                </div>
              ))}
          </div>
          <button className="button add-usuario-button" onClick={handleAddProfessorClick}>
            Adicionar Professor
          </button>
          {showConfirmModal && (
            <Modal
              message={`Tem certeza de que deseja deletar o Professor com login ${ProfessorToDelete}?`}
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default ProfessoresPage;
