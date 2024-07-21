import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Ícones de edição e exclusão
import BaseLayout from '../../components/common/BaseLayout';
import '../../style/lista_usuarios.css'; // Adicione um arquivo CSS para estilizar a página
import '../../style/conteiner.css';
import api from '../../utils/AxiosConfig'; // Importe a configuração do Axios

const AlunosPage = () => {
  const [alunos, setAlunos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Função para buscar alunos da API
  const fetchAlunos = async () => {
    try {
      const response = await api.get('/usuarios/alunos'); // Usando a instância do Axios configurada
      setAlunos(response.data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  // Chama a função fetchAlunos quando o componente é montado
  useEffect(() => {
    fetchAlunos();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddAluno = () => {
    // Navegue para a página de adicionar aluno (ou abra um modal, conforme necessário)
  };

  const handleEditAluno = (id) => {
    // Navegue para a página de edição do aluno com o id especificado
  };

  const handleDeleteAluno = (id) => {
    // Lógica para excluir o aluno com o id especificado
  };

  return (
    <BaseLayout>
      <div className="page-conteiner">
        <div className="content-container">
          <h2>Página de Alunos</h2>
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
            {/* Cabeçalhos da lista */}
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
          <button className="button add-usuario-button" onClick={handleAddAluno}>
            Adicionar Aluno
          </button>
        </div>
      </div>
    </BaseLayout>
  );
};

export default AlunosPage;
