
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sessions', table => {
    table.increments('id').primary()
    table.string('user_id')
    table.string('socket_id')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sessions')
};
