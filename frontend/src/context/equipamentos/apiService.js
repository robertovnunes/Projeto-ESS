import api from '../../utils/AxiosConfig';

//Função para buscar todos os equipamentos
export const fetchEquipamentos = async () => {
    try {
        const response = await api.get('/equipamentos'); // Substitua pela URL da sua API
        return response.data;
    } catch (error) {
        throw error;
    }
};

//Função para buscar um equipamento
export const fetchEquipamento = async (id) => {
  try {
    const response = await api.get(`/equipamentos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar equipamento:', error);
    throw error;
  }
};

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

//Função para atualizar um equipamento
export const patchEquipamento = async (id, equipamento) => {
    try {
        const response = await api.patch(`/equipamentos/${id}`, equipamento);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar equipamento:', error);
        throw error;
    }
};

//Função para deletar um equipamento
export const deleteEquipamento = async (id) => {
    try {
        const response = await api.delete(`/equipamentos/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar equipamento:', error);
        throw error;
    }
};


//Reservas de equipamentos
//Função para criar reserva de equipamento
export const createReserva = async (reserva) => {
    try {
        const response = await api.post('/reservas/equipamentos', reserva);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar reserva:', error);
        throw error;
    }
};

//Função para buscar todas as reservas
export const fetchReservas = async () => {
    try {
        const response = await api.get('/reservas/equipamentos');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar reservas:', error);
        throw error;
    }
};

//Função para buscar uma reserva
export const fetchReserva = async (id) => {
    try {
        const response = await api.get(`/reservas/equipamentos/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar reserva:', error);
        throw error;
    }
};

//Função para atualizar uma reserva
export const patchReserva = async (id, reserva) => {
    try {
        const response = await api.patch(`/reservas/equipamentos/${id}`, reserva);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar reserva:', error);
        throw error;
    }
};

//Reservas de manutenção de equipamento
//Função para criar reserva de manutenção
export const createManutencao = async (manutencao) => {
    try {
        const response = await api.post('/reservas/manutencao', manutencao);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar reserva de manutenção:', error);
        throw error;
    }
};

//Função para buscar todas as reservas de manutenção
export const fetchManutencoes = async () => {
    try {
        const response = await api.get('/reservas/manutencao');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar reservas de manutenção:', error);
        throw error;
    }
};

//Função para buscar uma reserva de manutenção
export const fetchManutencao = async (id) => {
    try {
        const response = await api.get(`/reservas/manutencao/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar reserva de manutenção:', error);
        throw error;
    }
};

//Função para atualizar uma reserva de manutenção
export const patchManutencao = async (id, manutencao) => {
    try {
        const response = await api.patch(`/reservas/manutencao/${id}`, manutencao);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar reserva de manutenção:', error);
        throw error;
    }
};