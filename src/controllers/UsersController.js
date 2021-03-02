const connection = require('../database/connection');

module.exports = {

    // Listar
    async view(request, response) {
        const users = await connection('users').select('*');
        return response.json({
            users
        });
    },

    // Criar    
    async create(request, response) {
        const {
            nome,
            email,
            password
        } = request.body;
        await connection('users').insert({
            nome,
            email,
            password,
        })

        return response.json({
            nome
        });
    }

};