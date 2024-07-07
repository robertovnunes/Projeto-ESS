class EquipamentoInjector {
  constructor() {
    this.service = new Map()
    this.repositories = new Map();
  }

    registerEquipmentService(type, service) {
        this.service.set(type, service);
    }

    getEquipmentService(service) {
        return this.service.get(service);
    }

    registerEquipmentRepository(type, repository) {
        this.repositories.set(type, repository);
    }

    getEquipmentRepository(repository) {
        return this.repositories.get(repository);
    }
}

module.exports = EquipamentoInjector;