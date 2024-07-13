const UsuariosService = require('./usuariosService');
const AdminRepository = require('../../repositories/usuarios/adminRepository');

class AdminService extends UsuariosService {
    constructor() {
        super(new AdminRepository());
    }
}

module.exports = AdminService;