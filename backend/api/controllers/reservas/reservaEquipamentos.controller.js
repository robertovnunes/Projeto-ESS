const reservaModel = require('../../models/equipamentos/reservas/reserva.model');

class reservaController {
    constructor(reservaService) {
        this.reservaService = reservaService;
        this.getReservas = this.getReservas.bind(this);
        this.getReservaByID = this.getReservaByID.bind(this);
        this.getReservasByEquipamentoID = this.getReservasByEquipamentoID.bind(this);
        this.createReserva = this.createReserva.bind(this);
        this.patchReserva = this.patchReserva.bind(this);
    }

    calculateDataFim = (dataInicio) => {
        let day, month, year;
        let data = new Date(dataInicio);
        day = data.getDate();
        month = data.getMonth();
        year = data.getFullYear();
        day = day+15;
        if (day > 30 && month === [4, 6, 9, 11].includes(month)) {
            day = day-30;
            month = month+1;
            if(month > 12) {
                month = 1;
                year = year+1;
            }
        } else if (day > 31 && month === [1, 3, 5, 7, 8, 10, 12].includes(month)) {
            day = day-31;
            month = month+1;
            if(month > 12) {
                month = 1;
                year = year+1;
            }
        } else if (day > 28 && month === 2) {
            day = day-28;
            month = month+1;
            if(month > 12) {
                month = 1;
                year = year+1;
            }
        }
        return new Date(year, month, day);
    };

    async getReservas(req, res) {
        const reservas = await this.reservaService.getReservas();
        console.log('GET /reservaEquipamento/equipamentos [200] OK');
        res.status(200).json(reservas);
    }

    async getReservaByID(req, res) {
        const id = req.params.id;
        const reserva = await this.reservaService.getReservaByID(id);
        if (reserva !== undefined) {
            console.log('GET /reservaEquipamento/equipamentos/:id [200] OK');
            res.status(200).json(reserva);
        } else {
            console.log('GET /reservaEquipamento/equipamentos/:id [404] Not Found');
            res.status(404).send({message: 'Reserva não encontrada'});
        }
    }

    async getReservasByEquipamentoID(req, res) {
        const id = req.params.id;
        const reservas = await this.reservaService.getReservasByEquipamentoID(id);
        if (reservas.status === 'ok') {
            console.log('GET /reservaEquipamento/equipamentos/equipamento/:id [200] OK');
            res.status(200).json(reservas.data);
        } else {
            console.log('GET /reservaEquipamento/equipamentos/equipamento/:id [404] Not Found');
            res.status(404).send({message: reservas.data});
        }
    }

    async createReserva(req, res) {
        const {equipamentoID, dataReserva, dataInicio, responsavel} = req.body;
        const dataFim = this.calculateDataFim(dataInicio);
        const reserva = new reservaModel(dataReserva, dataInicio, dataFim, responsavel, equipamentoID);
        const result = await this.reservaService.createReserva(reserva, equipamentoID);
        if (result.status === 'ok') {
            console.log('POST /reservaEquipamento/equipamentos [201] Created');
            res.status(201).json({message: 'Reserva criada com sucesso, pendente de confirmação'});
        } else {
            console.log('POST /reservaEquipamento/equipamentos [400] Bad Request '+result.message);
            res.status(400).send({message: result.message});
        }
    }

    async patchReserva(req, res) {
        const id = req.params.id;
        const status = req.body.status;
        const result = await this.reservaService.patchReserva(id, status);
        if (result.status === 'ok') {
            const message = `Reserva ${result.message}`;
            console.log('PATCH /reservaEquipamento/equipamentos/:id [200] OK');
            res.status(200).json({message: message});
        }
    }
}

module.exports = reservaController;