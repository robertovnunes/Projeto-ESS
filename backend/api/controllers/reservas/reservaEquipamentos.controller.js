const reservaModel = require('../../models/equipamentos/reservas/reserva.model');

class reservaController {
    constructor(reservaService) {
        this.reservaService = reservaService;
        this.getReservas = this.getReservas.bind(this);
        this.getReservaByID = this.getReservaByID.bind(this);
        this.getReservasByEquipamentoID = this.getReservasByEquipamentoID.bind(this);
    }

    async getReservas(req, res) {
        const reservas = await this.reservaService.getReservas();
        console.log('GET /reservas/equipamentos [200] OK');
        res.status(200).json(reservas);
    }

    async getReservaByID(req, res) {
        const id = req.params.id;
        const reserva = await this.reservaService.getReservaByID(id);
        if (reserva !== undefined) {
            console.log('GET /reservas/equipamentos/:id [200] OK');
            res.status(200).json(reserva);
        } else {
            console.log('GET /reservas/equipamentos/:id [404] Not Found');
            res.status(404).send({message: 'Reserva não encontrada'});
        }
    }

    async getReservasByEquipamentoID(req, res) {
        const id = req.params.id;
        const reservas = await this.reservaService.getReservasByEquipamentoID(id);
        if (reservas.status === 'ok') {
            console.log('GET /reservas/equipamentos/equipamento/:id [200] OK');
            res.status(200).json(reservas.data);
        } else {
            console.log('GET /reservas/equipamentos/equipamento/:id [404] Not Found');
            res.status(404).send({message: reservas.data});
        }
    }
   
}

module.exports = reservaController;