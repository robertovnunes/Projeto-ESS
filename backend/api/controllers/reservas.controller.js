const reservaManutencaoModel = require('../models/reservaManutencaoModel');
const reservaModel = require('../models/reservaModel');

class ReservasController {

    constructor(reservasService){
        this.reservasService = reservasService;
    }

    getAllReservas() {
        return this.reservasService.getAllReservas();
    }

    getReservaById(id) {
        return this.reservasService.getReservaById(id);
    }

    getReservaManutencaoById(id) {
        return this.reservasService.getReservaManutencaoById(id);
    }

    createReservaManutencao(newReserva) {
        return this.reservasService.createReservaManutencao(newReserva);
    }

    createReserva(newReserva) {
        return this.reservasService.createReserva(newReserva);
    }

    patchReserva(id, newReserva) {
        return this.reservasService.patchReserva(id, newReserva);
    }

}

module.exports = ReservasController;