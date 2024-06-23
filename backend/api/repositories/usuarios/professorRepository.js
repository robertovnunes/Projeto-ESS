const UsuariosRepository = require('./usuariosRepository');
const path = require('path');

class ProfessorRepository extends UsuariosRepository {
    constructor() {
        super(path.join(__dirname, '../../../db/professores.json'));
    }
}

module.exports = ProfessorRepository;
