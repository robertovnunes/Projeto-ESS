class EquipamentoInjector {
  constructor() {
    this.service = new Map()
    this.repositories = new Map();
  }

    registerService(name, service) {
        this.service.set(name, service);
    }

    getService(name) {
        return this.service.get(name);
    }

    registerRepository(name, repository) {
        this.repositories.set(name, repository);
    }

    getRepository(name) {
        return this.repositories.get(name);
    }
}

module.exports = EquipamentoInjector;