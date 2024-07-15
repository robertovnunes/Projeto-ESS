const reservaModel = require('../../models/equipamentos/reservas/reserva.model');

class reservaController {
    constructor(reservaService) {
        this.reservaService = reservaService;
        this.getReservas = this.getReservas.bind(this);
    }

    async getReservas(req, res) {
        const reservas = await this.reservaService.getReservas();
        res.status(200).json(reservas);
    }
}

module.exports = reservaController;