require('dotenv').config()
const ProfessorService = require('./professorService');
const AlunoService = require('./alunoService');
const AdminService = require('./adminService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
    constructor() {
        // Instanciando os serviços necessários
        this.professorService = new ProfessorService();
        this.alunoService = new AlunoService();
        this.adminService = new AdminService();
    }

    // Método para buscar usuário pelo login
    async getUserByLogin(login) {
        let usuario = null;
        let tipoUsuario = null;
    
        // Tenta buscar no serviço de Professor
        usuario = await this.professorService.getByLogin(login);
        if (usuario) {
            tipoUsuario = 'professor';
        }
    
        // Se não encontrar, tenta buscar no serviço de Aluno
        if (usuario == "Usuário não encontrado") {
            usuario = await this.alunoService.getByLogin(login);
            if (usuario) {
                tipoUsuario = 'aluno';
            }
        }
    
        // Se não encontrar, tenta buscar no serviço de Admin
        if (usuario == "Usuário não encontrado") {
            usuario = await this.adminService.getByLogin(login);
            if (usuario) {
                tipoUsuario = 'admin';
            }
        }
    
        // Retorna o usuário encontrado com o tipo ou null se não existir
        if (usuario) {
            return { login, tipo: tipoUsuario, senha: usuario.senha }; // Adiciona senha ao retorno
        } else {
            return null;
        }
    }

    // Método para gerar token JWT
    generateToken(login, tipo) {
        const token = jwt.sign(
            { login, tipo },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        return token;
    }

    // Método para verificar se a senha está correta
    async verifyPassword(senhaDigitada, senhaArmazenada) {
        // Comparação segura usando bcrypt
        return await bcrypt.compare(senhaDigitada, senhaArmazenada);
    }

    // Método para verificar se o token de acesso é válido
    verifyAccessToken(req) {
        const accessToken = req.cookies.accessToken;
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            return decoded;
        } catch (error) {
            return null;
        }
    }   
    
    async isAuthenticatedAs(req) {
        try {
            const accessToken = req.cookies.accessToken;
            if (!accessToken) {
                return { authenticated: false };
            }

            // Verificar se o token é válido
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const userType = req.cookies.userType;

            return {
                authenticated: true,
                userType: userType
            };
        } catch (error) {
            return { authenticated: false };
        }
    }
}

module.exports = AuthService;
