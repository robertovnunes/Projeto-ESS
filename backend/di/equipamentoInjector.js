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

    getEquipmentRepository(name) {
        return this.repositories.get(name);
    }
}

module.exports = EquipamentoInjector;