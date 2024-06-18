const AdminService = require('../../services/usuarios/adminService');
const BaseController = require('./usuariosController');

class AdminController extends BaseController {
    constructor() {
        super(new AdminService());
    }
}

module.exports = AdminController;
