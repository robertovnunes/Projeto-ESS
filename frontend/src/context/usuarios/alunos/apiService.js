// src/services/apiService.js
import api from '../../../utils/AxiosConfig'; // Importe a configuração do Axios

// Função para buscar todos os alunos
export const fetchAlunos = async () => {
  try {
    const response = await api.get('/usuarios/alunos');
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

// Função para adicionar um novo aluno
export const addAluno = async (aluno) => {
  try {
    const response = await api.post('/usuarios/alunos', aluno);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar aluno:', error);
    throw error;
  }
};

// Função para deletar um aluno
export const deleteUsuario = async (usuarios, login) => {
  try {
    const response = await api.delete(`/usuarios/${usuarios}/${login}`);
    return response.data; // Pode ser vazio ou conter uma mensagem, dependendo da resposta do backend
  } catch (error) {
    console.error('Erro ao deletar aluno:', error);
    throw error;
  }
};
