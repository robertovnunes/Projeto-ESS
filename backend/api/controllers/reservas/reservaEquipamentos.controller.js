const reservaModel = require('../../models/equipamentos/reservas/reserva.model');

class reservaController {
    constructor(reservaService) {
        this.reservaService = reservaService;
        this.getReservas = this.getReservas.bind(this);
    }

    async getReservas(req, res) {
        const reservas = await this.reservaService.getReservas();
        console.log('GET /reservas/equipamentos [200] OK');
        res.status(200).json(reservas);
    }
}

module.exports = reservaController;