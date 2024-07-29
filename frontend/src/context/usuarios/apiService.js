// src/services/apiService.js
import api from '../../utils/AxiosConfig'; // Importe a configuração do Axios

// Função para buscar todos os alunos
export const fetchUsuarios = async (usuarios) => {
  try {
    const response = await api.get(`/usuarios/${usuarios}`);
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

// Função para adicionar um novo aluno
export const addUsuario = async (usuarios, aluno) => {
  try {
    const response = await api.post(`/usuarios/${usuarios}`, aluno);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar Usuario:', error);
    throw error;
  }
};

// Função para deletar um aluno
export const deleteUsuario = async (usuarios, login) => {
  try {
    const response = await api.delete(`/usuarios/${usuarios}/${login}`);
    return response.data; // Pode ser vazio ou conter uma mensagem, dependendo da resposta do backend
  } catch (error) {
    console.error('Erro ao deletar Usuario:', error);
    throw error;
  }
};


