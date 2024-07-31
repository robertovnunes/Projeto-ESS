const fs = require('fs').promises; // Importa fs.promises para usar readFile promisificado
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Função para autenticar se o usuário tem permissão de administrador
const authenticateAdmin = (req) => {
    try {
        const accessToken = req.cookies.accessToken;
        const userTypeFromCookie = req.cookies.userType;

        if (!accessToken || userTypeFromCookie !== 'admin') {
            return false;
        }

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        // Verifique se o token é decodificado com sucesso
        if (decodedToken) {
            // Aqui você pode ajustar a lógica de acordo com a estrutura do seu token
            // Se o token for válido, considera-se que o usuário autenticado é um administrador
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return false;
    }
};

module.exports = {
    authenticateAdmin
};