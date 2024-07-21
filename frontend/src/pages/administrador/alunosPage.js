import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import BaseLayout from '../../components/common/BaseLayout';
import '../../style/lista_usuarios.css'; // Adicione um arquivo CSS para estilizar a página
import '../../style/conteiner.css';
import '../../style/adicionar_usuario.css'
import '../../style/icons.css'
import { fetchAlunos } from '../../context/usuarios/alunos/apiService'; // Importe a função de requisição

const AlunosPage = () => {
  const [alunos, setAlunos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
    navigate('/usuarios/alunos/adicionar'); // Redirecionar para a página de adicionar aluno
  };

  const handleEditAluno = (id) => {
    // Navegue para a página de edição do aluno com o id especificado
  };

  const handleDeleteAluno = (id) => {
    // Lógica para excluir o aluno com o id especificado
  };

  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from); // Navegar para a página anterior específica
    } else {
      navigate('/usuarios'); // Redirecionar para a página de usuários se não houver uma página anterior específica
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
        </div>
      </div>
    </BaseLayout>
  );
};

export default AlunosPage;
