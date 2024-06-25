const AlunoService = require('../../services/usuarios/alunoService');
const BaseController = require('./usuariosController');

class AlunoController extends BaseController {
    constructor() {
        super(new AlunoService());
    }
}

module.exports = AlunoController;
