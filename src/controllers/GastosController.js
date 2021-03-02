const connection = require('../database/connection');

module.exports = {

    // Listar
    async view(request, response) {
        const {
            page = 1
        } = request.query;
        const [count] = await connection('gastos').count();
        const gastos = await connection('gastos')
        .join(`users`, `users.id`, `=`,`gastos.userId`)
        .limit(5)
        .offset((page - 1) * 5)
        .select(['gastos.*',
        `users.nome`,
        `users.email`]);
        
        response.header(`X-Total-Count`, count[`count(*)`]);
        return response.json(
            gastos)
    },

    // Excluir
    async delete(request, response) {
        const userId = request.headers.authorization;
        const {
            id
        } = request.params;

        const gastos = await connection('gastos').where(`id`, id).select('userId').first();

        if (gastos.userId != userId) {
            return response.status(401).json({
                error: `Not Permitted`
            });
        }

        await connection(`gastos`).where(`id`, id).delete();

        return response.json({
            success: `Sucesso ao excluir`
        });

    },


    // Criar
    async create(request, response) {
        const {
            gasto,
            data,
            valor
        } = request.body;
        const userId = request.headers.authorization;
        const result = await connection('gastos').insert({
            gasto,
            data,
            valor,
            userId,
        })
        const id = result[0]
        return response.json({
            id
        });
    }

};