exports.up = function (knex) {
    return knex.schema.createTable('gastos', function (table) {
        table.increments();
        table.string('gasto').notNullable();
        table.string('data').notNullable();
        table.decimal('valor').notNullable();

        table.string('userId').notNullable();
        table.foreign('userId').references('id').inTable('users')
    });
};

exports.down = function (knex) {
    return knex.schema.createTable('gastos')
};
