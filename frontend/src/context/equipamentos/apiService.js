import api from '../../utils/AxiosConfig'; // Importe a configuração do Axios

//Função para adicionar um equipamento
export const addEquipamento = async (equipamento) => {
  try {
    const response = await api.post('/equipamentos', equipamento, {
      timeout: 10000
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar equipamento:', error);
    throw error;
  }
};

//Função para buscar um equipamento
export const getEquipamento = async (id) => {
  try {
    const response = await api.get(`/equipamentos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar equipamento:', error);
    throw error;
  }
};

//Função para buscar todos os equipamentos
export const fetchEquipamentos = async () => {
  try {
    const response = await api.get('/api/equipamentos'); // Substitua pela URL da sua API
    return response.data;
  } catch (error) {
    throw error;
  }
};