import api from '../../utils/AxiosConfig'; // Importe a configuração do Axios

//Função para adicionar um equipamento
export const addEquipamento = async (equipamento) => {
  try {
    const response = await api.post('/equipamentos', equipamento);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar equipamento:', error);
    throw error;
  }
};