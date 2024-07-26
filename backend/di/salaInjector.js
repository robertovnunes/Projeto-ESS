class SalaInjector {
  constructor() {
    this.service = new Map()
    this.repositories = new Map();
  }

    registerSalaService(type, service) {
        this.service.set(type, service);
    }

    getSalaService(service) {
        return this.service.get(service);
    }

    registerSalaRepository(type, repository) {
        this.repositories.set(type, repository);
    }

    getSalaRepository(name) {
        return this.repositories.get(name);
    }
}

module.exports = SalaInjector;