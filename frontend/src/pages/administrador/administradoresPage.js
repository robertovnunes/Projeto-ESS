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

const AdminsPage = () => {
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Estado para controle do modal de confirmação
  const [AdminToDelete, setAdminToDelete] = useState(null); // Estado para armazenar o Admin a ser deletado
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getAdmins = async () => {
      try {
        const data = await fetchUsuarios("admins");
        setAdmins(data);
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    getAdmins();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddAdminClick = () => {
    navigate('/usuarios/admins/adicionar');
  };

  const handleEditAdmin = (login) => {
    // Navegue para a página de edição do Admin com o login especificado
  };

  const handleDeleteAdmin = (login) => {
    setAdminToDelete(login); // Armazena o Admin a ser deletado e exibe o modal
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (AdminToDelete) {
        console.log(AdminToDelete)
        await deleteUsuario("admins", AdminToDelete); // Chamar a função de exclusão do backend
        const updatedAdmins = admins.filter(admin => admin.login !== AdminToDelete);
        setAdmins(updatedAdmins);
        setAdminToDelete(null); // Limpar o Admin selecionado
      }
    } catch (error) {
      console.error('Erro ao deletar Admin:', error);
    } finally {
      setShowConfirmModal(false); // Fechar o modal de confirmação
    }
  };

  const cancelDelete = () => {
    setAdminToDelete(null); // Limpar o Admin selecionado
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
            <h2>Página de Admins</h2>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar Admin..."
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
            {admins
              .filter(admin =>
                admin.nome.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(admin => (
                <div key={admin.login} className="usuario-item">
                  <span className="usuario-name">{admin.nome}</span>
                  <span className="usuario-login">{admin.login}</span>
                  <div className="usuario-actions">
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="usuario-action-icon edit-icon"
                      onClick={() => handleEditAdmin(admin.login)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="usuario-action-icon delete-icon"
                      onClick={() => handleDeleteAdmin(admin.login)}
                      data-testid={`delete-icon-${admin.login}`} // Adicionando este atributo
                    />
                  </div>
                </div>
              ))}
          </div>
          <button className="button add-usuario-button" onClick={handleAddAdminClick}>
            Adicionar Admin
          </button>
          {showConfirmModal && (
            <Modal
              message={`Tem certeza de que deseja deletar o administrador com login ${AdminToDelete}?`}
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default AdminsPage;
