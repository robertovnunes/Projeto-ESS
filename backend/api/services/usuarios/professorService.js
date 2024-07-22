const UsuariosService = require('./usuariosService');
const ProfessorRepository = require('../../repositories/usuarios/professorRepository');

class ProfessorService extends UsuariosService {
    constructor() {
        super(new ProfessorRepository());
    }
}

module.exports = ProfessorService;
