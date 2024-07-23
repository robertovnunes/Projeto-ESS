const reservaModel = require('../../models/equipamentos/reservas/manutencao.model');

class reservaController {
    constructor(manutencaoService) {
        this.manutencaoService = manutencaoService;
        this.getReservas = this.getReservas.bind(this);
        this.getReservaByID = this.getReservaByID.bind(this);
        this.getReservasByEquipamentoID = this.getReservasByEquipamentoID.bind(this);
        this.createReserva = this.createReserva.bind(this);
        this.patchReserva = this.patchReserva.bind(this);
    }

    async getReservas(req, res) {
        const reservas = await this.manutencaoService.getReservas();
        console.log('GET /reservaEquipamento/manutencao [200] OK');
        res.status(200).json(reservas);
    }

    async getReservaByID(req, res) {
        const id = req.params.id;
        const reserva = await this.manutencaoService.getReservaByID(id);
        if (reserva !== undefined) {
            console.log('GET /reservaEquipamento/manutencao/:id [200] OK');
            res.status(200).json(reserva);
        } else {
            console.log('GET /reservaEquipamento/manutencao/:id [404] Not Found');
            res.status(404).send({message: 'Reserva não encontrada'});
        }
    }

    async getReservasByEquipamentoID(req, res) {
        const id = req.params.id;
        const reservas = await this.manutencaoService.getReservasByEquipamentoID(id);
        if (reservas.status === 'ok') {
            console.log('GET /reservaEquipamento/manutencao/equipamento/:id [200] OK');
            res.status(200).json(reservas.data);
        } else {
            console.log('GET /reservaEquipamento/manutencao/equipamento/:id [404] Not Found');
            res.status(404).send({message: reservas.data});
        }
    }

    async createReserva(req, res) {
        const {equipamentoID, dataInicio, responsavel, tecnico, depto} = req.body;
        const reserva = new reservaModel(new Date(dataInicio), responsavel, tecnico, depto, equipamentoID);
        const result = await this.manutencaoService.createReserva(reserva, equipamentoID);
        if (result.status === 'ok') {
            console.log('POST /reservaEquipamento/manutencao [201] Created');
            res.status(201).json({message: 'Reserva criada com sucesso', id: result.id});
        } else {
            console.log('POST /reservaEquipamento/manutencao [400] Bad Request '+result.message);
            res.status(400).send({message: result.message});
        }
    }

    async patchReserva(req, res) {
        const id = req.params.id;
        const status = req.body.status;
        const result = await this.manutencaoService.patchReserva(id, status);
        if (result.status === 'ok') {
            const message = `Reserva ${result.message}`;
            console.log('PATCH /reservaEquipamento/manutencao/:id [200] OK');
            res.status(200).json({message: message});
        }
    }
}

module.exports = reservaController;