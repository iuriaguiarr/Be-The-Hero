const connection = require('../database/connection');

module.exports = {
    async view(request, response) {
        const id = request.headers.authorization;

        const gastos = await connection('gastos').where(`userId`,id).select('*');
        
        return response.json(gastos);

    },
}