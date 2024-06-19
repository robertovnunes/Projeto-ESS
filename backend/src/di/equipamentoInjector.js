class EquipamentoInjector {
  constructor() {
    this.service = new Map()
    this.repositories = new Map();
  }

    registerEquipmentService(name, service) {
        this.service.set(name, service);
    }

    getEquipmentService(service) {
        return this.service.get(service);
    }

    registerEquipmentRepository(name, repository) {
        this.repositories.set(name, repository);
    }

    getEquipmentRepository(name) {
        return this.repositories.get(name);
    }
}

module.exports = EquipamentoInjector;