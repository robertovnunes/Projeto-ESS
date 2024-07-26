class SalasService {
    constructor(salaRepository){
        this.salaRepository = salaRepository;
    }

    getAllSalas() {
        let salas = this.salaRepository.getAllSalas();
        return salas
    }

    getSalaById(id) {
        let sala = this.salaRepository.getSalaById(id);
        return sala;
    }


    createSala(newSala) {
        return this.salaRepository.createSala(newSala);
    }

    patchSala(id, newSala) {
        return this.salaRepository.updateSala(id, newSala);
    }

    deleteSala(id) {
        return this.salaRepository.deleteSala(id);
    }
}

module.exports = SalasService;