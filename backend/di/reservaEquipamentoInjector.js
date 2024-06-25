class ReservaInjector {
  constructor() {
    this.service = new Map()
    this.repositories = new Map();
  }

    registerReservaService(type, service) {
        this.service.set(type, service);
    }

    registerReservaRepository(type, repository) {
        this.repositories.set(type, repository);
    }


    getReservaService(service) {
        return this.service.get(service);
    }

    getReservaRepository(repository) {
        return this.repositories.get(repository);
    }

}

module.exports = ReservaInjector;