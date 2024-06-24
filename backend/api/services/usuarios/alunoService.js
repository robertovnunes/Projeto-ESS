const UsuariosService = require('./usuariosService');
const AlunoRepository = require('../../repositories/usuarios/alunoRepository');

class AlunoService extends UsuariosService {
    constructor() {
        super(new AlunoRepository());
    }
}

module.exports = AlunoService;
