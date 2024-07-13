const ProfessorService = require('../../services/usuarios/professorService');
const BaseController = require('./usuariosController');
const bcrypt = require('bcryptjs');

class ProfessorController extends BaseController {
    constructor() {
        super(new ProfessorService());
    }

    async create(req, res) {
        try {
            // Verificar se o usuário está autenticado e recebe o tipo do usuário
            const existingToken = this.AuthService.isAuthenticatedAs(req);

            if(!existingToken || ((await existingToken).userType != 'admin')) 
                return res.status(401).send('Acesso Restrito');

            const { nome, login, senha, SIAPE } = req.body;

            if (!nome || !login || !senha || !SIAPE) {
                return res.status(400).send({ message: 'Campos nome, login, senha e SIAPE são obrigatórios' });
            }

            // Encriptar a senha
            const salt = await bcrypt.genSalt(10);
            const hashedSenha = await bcrypt.hash(senha, salt);

            const novoProfessor = { nome, login, senha: hashedSenha, SIAPE };
            const professorCriado = await this.service.create(novoProfessor);

            if (professorCriado === 'Usuário já existe') {
                return res.status(409).send({ message: 'Usuário já existe' });
            }

            res.status(201).send(professorCriado);
        } catch (error) {
            console.error('Erro ao criar professor:', error);
            res.status(500).send({ message: '[500] INTERNAL SERVER ERROR' });
        }
    }
}

module.exports = ProfessorController;
